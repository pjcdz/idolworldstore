import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/products/[id]/like - Incrementar like
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase.rpc('increment_product_likes', {
      p_product_id: id
    });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al incrementar like' },
        { status: 500 }
      );
    }

    if (data === -1) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ likes: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/like - Decrementar like
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase.rpc('decrement_product_likes', {
      p_product_id: id
    });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al decrementar like' },
        { status: 500 }
      );
    }

    if (data === -1) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ likes: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
