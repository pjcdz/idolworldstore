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

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { productIds, action } = await request.json();
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere un array de IDs de productos' },
        { status: 400 }
      );
    }

    if (!['activate', 'deactivate', 'delete'].includes(action)) {
      return NextResponse.json(
        { error: 'Acción inválida. Use: activate, deactivate, o delete' },
        { status: 400 }
      );
    }

    let updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (action === 'activate') {
      updateData.is_active = true;
    } else if (action === 'deactivate' || action === 'delete') {
      updateData.is_active = false;
    }

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .in('id', productIds)
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al actualizar productos' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `${data.length} productos ${
        action === 'activate' ? 'activados' : 
        action === 'deactivate' ? 'desactivados' : 'eliminados'
      } correctamente`,
      updatedProducts: data
    });

  } catch (error) {
    console.error('Bulk action API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
