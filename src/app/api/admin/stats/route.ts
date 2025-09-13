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
    // Obtener estadísticas de productos
    const [activeResult, totalResult, categoryResult] = await Promise.all([
      // Productos activos
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),
      
      // Total de productos
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true }),
      
      // Productos por categoría
      supabase
        .from('products')
        .select('category, is_active')
        .eq('is_active', true)
    ]);

    const activeCount = activeResult.count || 0;
    const totalCount = totalResult.count || 0;
    const inactiveCount = totalCount - activeCount;

    // Contar por categorías
    const categoryData = categoryResult.data || [];
    const categoryCounts = categoryData.reduce((acc: Record<string, number>, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    // Obtener productos con más likes
    const { data: topProducts } = await supabase
      .from('products')
      .select('id, title, likes, category')
      .eq('is_active', true)
      .order('likes', { ascending: false })
      .limit(5);

    return NextResponse.json({
      totalProducts: totalCount,
      activeProducts: activeCount,
      inactiveProducts: inactiveCount,
      categoryDistribution: categoryCounts,
      topProducts: topProducts || []
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
