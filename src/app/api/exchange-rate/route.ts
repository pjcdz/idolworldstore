import { NextResponse } from 'next/server';

// Tipo de cambio fallback (actualizar manualmente cuando sea necesario)
const FALLBACK_RATE = 1343.5;

export async function GET() {
  try {
    let exchangeRate = FALLBACK_RATE;
    let source = 'fallback';
    let lastUpdated = new Date().toISOString();

    // Intentar obtener de API externa
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
        next: { revalidate: 3600 } // Cache por 1 hora
      });

      if (response.ok) {
        const data = await response.json();
        if (data.rates?.ARS) {
          exchangeRate = data.rates.ARS;
          source = 'exchangerate-api';
          lastUpdated = data.date || lastUpdated;
        }
      }
    } catch (apiError) {
      console.warn('Exchange rate API error:', apiError);
    }

    return NextResponse.json({
      usd_to_ars: exchangeRate,
      source,
      last_updated: lastUpdated,
      success: true
    });

  } catch (error) {
    console.error('Exchange rate API error:', error);
    
    // Retornar fallback en caso de error
    return NextResponse.json({
      usd_to_ars: FALLBACK_RATE,
      source: 'fallback_error',
      last_updated: new Date().toISOString(),
      success: false,
      error: 'Could not fetch current exchange rate'
    });
  }
}
