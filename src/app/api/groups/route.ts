import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// API para obtener grupos disponibles (artistas/grupos con productos)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  try {
    // Remove unused searchParams
    // const { searchParams } = new URL(request.url);
    // Remove unused variable
    // const includeCount = searchParams.get('include_count') === 'true';

    // Lista de grupos principales de K-pop
    const mainGroups = [
      'TWICE', 'STRAY KIDS', 'TOMORROW X TOGETHER', 
      'BLACKPINK', 'NEWJEANS', 'ITZY', 'AESPA', 'IVE', 
      '(G)I-DLE', 'LE SSERAFIM', 'NMIXX'
    ];

    // Remove unused query variable
    // const query = `
    //   SELECT 
    //     tag as group_name,
    //     COUNT(*) as product_count
    //   FROM (
    //     SELECT unnest(tags) as tag
    //     FROM products 
    //     WHERE is_active = true
    //   ) tag_list
    //   WHERE tag = ANY($1)
    //   GROUP BY tag
    //   ORDER BY product_count DESC, tag ASC
    // `;

    // Obtener todos los productos con tags
    const { data: rawData, error: rawError } = await supabase
      .from('products')
      .select('tags')
      .eq('is_active', true);

    if (rawError) {
      console.error('Database error:', rawError);
      return NextResponse.json(
        { error: 'Error al obtener grupos disponibles' },
        { status: 500 }
      );
    }

    // Procesar tags para obtener grupos disponibles
    const tagCounts = new Map();
    rawData?.forEach(product => {
      product.tags?.forEach((tag: string) => {
        if (mainGroups.includes(tag)) {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        }
      });
    });

    const data = Array.from(tagCounts.entries()).map(([group_name, product_count]) => ({
      group_name,
      product_count
    })).sort((a, b) => b.product_count - a.product_count);

    const error = null;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Error al obtener grupos disponibles' },
        { status: 500 }
      );
    }

    const response = {
      groups: data || [],
      totalGroups: data?.length || 0,
      message: data?.length ? 
        '¡Elige tu grupo favorito para ver productos exclusivos!' : 
        'No hay grupos disponibles en este momento'
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
