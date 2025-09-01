import { useState, useEffect } from 'react';

interface ExchangeRate {
  usd_to_ars: number;
  last_updated: string;
  source: string;
}

interface UseExchangeRateReturn {
  rate: number | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  convertUsdToArs: (usdAmount: number) => number;
}

// Tipo de cambio fallback (actualizado manualmente)
const FALLBACK_RATE = 1343.5; // Aproximadamente 1 USD = 1343.5 ARS (Agosto 2025)

export function useExchangeRate(): UseExchangeRateReturn {
  const [exchangeData, setExchangeData] = useState<ExchangeRate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Intentar obtener de localStorage primero (cache)
        const cachedData = localStorage.getItem('exchange_rate');
        const cacheExpiry = localStorage.getItem('exchange_rate_expiry');
        
        if (cachedData && cacheExpiry) {
          const expiryTime = parseInt(cacheExpiry);
          const now = Date.now();
          
          // Si el cache es válido (menos de 1 hora)
          if (now < expiryTime) {
            const parsedData = JSON.parse(cachedData);
            setExchangeData(parsedData);
            setIsLoading(false);
            return;
          }
        }

        // Intentar obtener de APIs externas
        let rateData: ExchangeRate | null = null;

        // Opción 1: API del Banco Central (si está disponible)
        try {
          const bcraResponse = await fetch('https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones?fecha=' + 
            new Date().toISOString().split('T')[0]);
          
          if (bcraResponse.ok) {
            const bcraData = await bcraResponse.json();
            const usdRate = bcraData.results?.find((item: { detalle?: string; valor?: number }) => 
              item.detalle?.toLowerCase().includes('dólar')
            );
            
            if (usdRate && usdRate.valor) {
              rateData = {
                usd_to_ars: parseFloat(usdRate.valor),
                last_updated: new Date().toISOString(),
                source: 'BCRA'
              };
            }
          }
        } catch (bcraError) {
          console.warn('BCRA API not available:', bcraError);
        }

        // Opción 2: API alternativa (exchangerate-api.com)
        if (!rateData) {
          try {
            const exchangeResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            
            if (exchangeResponse.ok) {
              const exchangeData = await exchangeResponse.json();
              
              if (exchangeData.rates?.ARS) {
                rateData = {
                  usd_to_ars: exchangeData.rates.ARS,
                  last_updated: exchangeData.date || new Date().toISOString(),
                  source: 'ExchangeRate-API'
                };
              }
            }
          } catch (exchangeError) {
            console.warn('ExchangeRate-API not available:', exchangeError);
          }
        }

        // Si no se pudo obtener de APIs, usar valor fallback
        if (!rateData) {
          rateData = {
            usd_to_ars: FALLBACK_RATE,
            last_updated: new Date().toISOString(),
            source: 'Fallback (Manual)'
          };
        }

        setExchangeData(rateData);

        // Guardar en localStorage con expiración de 1 hora
        const expiry = Date.now() + (60 * 60 * 1000); // 1 hora
        localStorage.setItem('exchange_rate', JSON.stringify(rateData));
        localStorage.setItem('exchange_rate_expiry', expiry.toString());

      } catch (err) {
        console.error('Error fetching exchange rate:', err);
        setError('No se pudo obtener el tipo de cambio');
        
        // Usar valor fallback en caso de error
        const fallbackData: ExchangeRate = {
          usd_to_ars: FALLBACK_RATE,
          last_updated: new Date().toISOString(),
          source: 'Fallback (Error)'
        };
        setExchangeData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  const convertUsdToArs = (usdAmount: number): number => {
    if (!exchangeData) return usdAmount * FALLBACK_RATE;
    return Math.round(usdAmount * exchangeData.usd_to_ars);
  };

  return {
    rate: exchangeData?.usd_to_ars || null,
    isLoading,
    error,
    lastUpdated: exchangeData?.last_updated || null,
    convertUsdToArs,
  };
}
