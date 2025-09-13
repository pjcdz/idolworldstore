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

export async function GET(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const includeInactive = searchParams.get('include_inactive') === 'true';
    const minPrice = searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')!) : null;
    const maxPrice = searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')!) : null;
    const minLikes = searchParams.get('min_likes') ? parseInt(searchParams.get('min_likes')!) : null;
    const tagsParam = searchParams.get('tags');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');
    const sortBy = searchParams.get('sort_by') || 'created_at';
    const sortOrder = searchParams.get('sort_order') || 'desc';
    
    let tags: string[] = [];
    if (tagsParam) {
      try {
        tags = JSON.parse(tagsParam);
      } catch {
        tags = [];
      }
    }
    
    const offset = (page - 1) * limit;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    // Incluir productos inactivos si se especifica
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    // Filtrar por categoría
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Buscar por título o descripción
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Filtros de precio
    if (minPrice !== null) {
      query = query.gte('price_usd', minPrice);
    }
    if (maxPrice !== null) {
      query = query.lte('price_usd', maxPrice);
    }

    // Filtro de likes
    if (minLikes !== null) {
      query = query.gte('likes', minLikes);
    }

    // Filtro de tags
    if (tags.length > 0) {
      query = query.contains('tags', tags);
    }

    // Filtros de fecha
    if (dateFrom) {
      query = query.gte('created_at', dateFrom);
    }
    if (dateTo) {
      query = query.lte('created_at', `${dateTo}T23:59:59`);
    }

    // Ordenamiento
    const ascending = sortOrder === 'asc';
    query = query.order(sortBy, { ascending });

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
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page
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
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const product = await request.json();
    
    // Validar campos requeridos
    if (!product.title || !product.description || !product.price_usd || !product.category) {
      return NextResponse.json(
        { error: 'Campos requeridos: title, description, price_usd, category' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .insert([{
        title: product.title,
        description: product.description,
        requester: product.requester || 'Admin',
        images: product.images || [],
        price_usd: parseFloat(product.price_usd),
        category: product.category,
        tags: product.tags || [],
        likes: 0,
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

    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
