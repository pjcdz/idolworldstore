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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', resolvedParams.id)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const updates = await request.json();
    
    // Preparar los datos a actualizar
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    };

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.requester !== undefined) updateData.requester = updates.requester;
    if (updates.images !== undefined) updateData.images = updates.images;
    if (updates.price_usd !== undefined) updateData.price_usd = parseFloat(updates.price_usd);
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.tags !== undefined) updateData.tags = updates.tags;
    if (updates.is_active !== undefined) updateData.is_active = updates.is_active;

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', resolvedParams.id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al actualizar producto' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    // Borrado lógico: marcar como inactivo en lugar de eliminar
    const { data, error } = await supabase
      .from('products')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', resolvedParams.id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al eliminar producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Producto eliminado correctamente',
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
