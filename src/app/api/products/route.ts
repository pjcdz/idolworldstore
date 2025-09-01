import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tagsParam = searchParams.get('tags');
    let tags: string[] = [];
    
    if (tagsParam) {
      try {
        // Intentar parsear como JSON primero
        tags = JSON.parse(tagsParam);
      } catch {
        // Si falla, usar como string separado por comas
        tags = tagsParam.split(',').filter(Boolean);
      }
    }
    
    const minLikes = searchParams.get('min_likes') ? parseInt(searchParams.get('min_likes')!) : undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const orderBy = searchParams.get('order_by') as 'likes' | 'created_at' | 'price_usd' || 'likes';

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    // Aplicar filtros
    if (category && category !== 'ALL') {
      query = query.eq('category', category);
    }
    if (tags && tags.length > 0) {
      // Usar contains en lugar de overlaps para AND logic
      query = query.contains('tags', tags);
    }
    if (minLikes !== undefined) {
      query = query.gte('likes', minLikes);
    }

    // Ordenamiento
    if (orderBy === 'likes') {
      query = query.order('likes', { ascending: false });
    } else if (orderBy === 'created_at') {
      query = query.order('created_at', { ascending: false });
    } else if (orderBy === 'price_usd') {
      query = query.order('price_usd', { ascending: true });
    }

    // Paginación
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al obtener productos' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: data || [],
      totalCount: count || 0,
      hasMore: (count || 0) > offset + limit
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    
    const { data, error } = await supabase
      .from('products')
      .insert([{
        id: product.id,
        title: product.title,
        description: product.description,
        requester: product.requester,
        images: product.images,
        price_usd: product.price_usd,
        category: product.category,
        tags: product.tags || [],
        likes: product.likes || 0,
        is_active: true
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al crear producto' },
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
