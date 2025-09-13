import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function verifyAdminToken(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = JSON.parse(atob(token));
    const now = Date.now() / 1000;
    return decoded.exp > now && decoded.username === 'zaki';
  } catch {
    return false;
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    // Restaurar producto (activar)
    const { data, error } = await supabase
      .from('products')
      .update({ 
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al restaurar producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Producto restaurado correctamente',
      product: data 
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
