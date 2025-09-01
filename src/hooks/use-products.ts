import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface Product {
  id: string;
  title: string;
  description?: string;
  requester: string;
  images: string[];
  price_usd: number;
  category: string;
  tags?: string[]; // Sistema de tags flexible
  likes: number; // Likes integrados
  created_at: string;
  updated_at: string;
}

interface ProductsFilters {
  category?: string;
  tags?: string[];
  min_likes?: number;
  limit?: number;
  offset?: number;
  order_by?: 'likes' | 'created_at' | 'price_usd';
  include_related?: boolean; // Nueva opción para incluir productos relacionados
}

interface UseProductsReturn {
  products: Product[];
  exactProducts: Product[]; // Productos que coinciden exactamente
  relatedProducts: Product[]; // Productos relacionados
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalCount: number;
  exactCount: number;
  relatedCount: number;
  incrementLike: (productId: string) => Promise<number | null>;
  decrementLike: (productId: string) => Promise<number | null>;
}

export function useProducts(filters: ProductsFilters = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [exactProducts, setExactProducts] = useState<Product[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [exactCount, setExactCount] = useState(0);
  const [relatedCount, setRelatedCount] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let exactProductsData: Product[] = [];
      let relatedProductsData: Product[] = [];
      let exactCountData = 0;
      let relatedCountData = 0;

      // Si tenemos tags y include_related está habilitado, hacer búsqueda progresiva
      if (filters.tags && filters.tags.length > 0 && filters.include_related) {
        
        // Construir la jerarquía de filtros de más específico a menos específico
        const filterLevels: { tags: string[], category?: string, description: string }[] = [];
        const baseTags = [...filters.tags];
        
        // Nivel 1 (EXACTO): Todos los tags + categoría (si existe)
        if (filters.category && filters.category !== 'ALL') {
          filterLevels.push({
            tags: baseTags,
            category: filters.category,
            description: `${baseTags.join(' + ')} + ${filters.category}`
          });
        } else {
          filterLevels.push({
            tags: baseTags,
            description: baseTags.join(' + ')
          });
        }

        // Nivel 2+ (RELACIONADOS): Ir quitando tags uno por uno desde el final
        // Ejemplo: [TWICE, SANA] → [TWICE]
        for (let i = baseTags.length - 1; i > 0; i--) {
          const levelTags = baseTags.slice(0, i);
          filterLevels.push({
            tags: levelTags,
            description: levelTags.join(' + ')
          });
        }

        console.log('Filter levels:', filterLevels);

        const excludedIds = new Set<string>();
        let levelIndex = 0;

        // Procesar cada nivel de filtros
        for (const level of filterLevels) {
          let levelQuery = supabase
            .from('products')
            .select('*', { count: 'exact' })
            .eq('is_active', true)
            .contains('tags', level.tags);

          // Aplicar filtro de categoría si existe en este nivel
          if (level.category) {
            levelQuery = levelQuery.eq('category', level.category);
          }

          if (filters.min_likes !== undefined) {
            levelQuery = levelQuery.gte('likes', filters.min_likes);
          }

          // Excluir productos ya mostrados en niveles anteriores
          if (excludedIds.size > 0) {
            const excludedIdsArray = Array.from(excludedIds);
            console.log(`Excluding IDs in level ${levelIndex}:`, excludedIdsArray);
            levelQuery = levelQuery.not('id', 'in', `(${excludedIdsArray.join(',')})`);
          }

          // Ordenamiento
          const orderBy = filters.order_by || 'likes';
          if (orderBy === 'likes') {
            levelQuery = levelQuery.order('likes', { ascending: false });
          } else if (orderBy === 'created_at') {
            levelQuery = levelQuery.order('created_at', { ascending: false });
          } else if (orderBy === 'price_usd') {
            levelQuery = levelQuery.order('price_usd', { ascending: true });
          }

          // Limitar resultados por nivel
          const levelLimit = levelIndex === 0 ? 50 : 20; // Más resultados para el nivel exacto
          levelQuery = levelQuery.limit(levelLimit);

          const { data: levelData, error: levelError } = await levelQuery;
          
          if (levelError) {
            console.error(`Error in level ${level.description}:`, levelError);
            continue;
          }

          const levelProducts = (levelData || []).map(transformProduct);
          console.log(`Level ${levelIndex}: "${level.description}" found ${levelProducts.length} products`);
          
          if (levelProducts.length > 0) {
            console.log(`Products in level ${levelIndex}:`, levelProducts.map(p => ({ id: p.id, title: p.title, tags: p.tags })));
          }

          // *** AGREGAR IDs a la lista de excluidos ANTES de procesarlos ***
          levelProducts.forEach(product => {
            if (!excludedIds.has(product.id)) {
              excludedIds.add(product.id);
            } else {
              console.warn(`Duplicate product found: ${product.id}`);
            }
          });

          // Filtrar duplicados localmente como medida adicional de seguridad
          const uniqueLevelProducts = levelProducts.filter(product => {
            const isDuplicate = (levelIndex === 0 ? exactProductsData : relatedProductsData)
              .some(existing => existing.id === product.id);
            if (isDuplicate) {
              console.warn(`Local duplicate filtered: ${product.id}`);
            }
            return !isDuplicate;
          });

          // Separar en exactos (primer nivel) y relacionados (resto)
          if (levelIndex === 0) {
            exactProductsData = [...exactProductsData, ...uniqueLevelProducts];
            exactCountData = uniqueLevelProducts.length; // Usar longitud real en lugar de count
          } else {
            relatedProductsData = [...relatedProductsData, ...uniqueLevelProducts];
            relatedCountData += uniqueLevelProducts.length; // Usar longitud real
          }

          levelIndex++;
        }

      } else {
        // Comportamiento original para búsquedas sin related
        let query = supabase
          .from('products')
          .select('*', { count: 'exact' })
          .eq('is_active', true);

        // Aplicar filtros
        if (filters.category && filters.category !== 'ALL') {
          query = query.eq('category', filters.category);
        }
        if (filters.tags && filters.tags.length > 0) {
          query = query.contains('tags', filters.tags);
        }
        if (filters.min_likes !== undefined) {
          query = query.gte('likes', filters.min_likes);
        }

        // Ordenamiento
        const orderBy = filters.order_by || 'likes';
        if (orderBy === 'likes') {
          query = query.order('likes', { ascending: false });
        } else if (orderBy === 'created_at') {
          query = query.order('created_at', { ascending: false });
        } else if (orderBy === 'price_usd') {
          query = query.order('price_usd', { ascending: true });
        }

        // Paginación
        if (filters.limit) {
          query = query.limit(filters.limit);
        }
        if (filters.offset) {
          query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
        }

        const { data, error: queryError, count } = await query;

        if (queryError) throw queryError;

        exactProductsData = (data || []).map(transformProduct);
        exactCountData = count || 0;
      }

      // Combinar productos exactos y relacionados
      const allProducts = [...exactProductsData, ...relatedProductsData];

      setProducts(allProducts);
      setExactProducts(exactProductsData);
      setRelatedProducts(relatedProductsData);
      setTotalCount(exactCountData + relatedCountData);
      setExactCount(exactCountData);
      setRelatedCount(relatedCountData);
      
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar productos');
    } finally {
      setIsLoading(false);
    }
  }, [
    filters.category,
    filters.tags,
    filters.min_likes,
    filters.limit,
    filters.offset,
    filters.order_by,
    filters.include_related,
  ]);

  // Función helper para transformar productos
  const transformProduct = (product: Record<string, unknown>): Product => ({
    id: product.id as string,
    title: product.title as string,
    description: product.description as string | undefined,
    requester: product.requester as string,
    images: (product.images as string[]) || [],
    price_usd: parseFloat((product.price_usd as string | number).toString()),
    category: product.category as string,
    tags: (product.tags as string[]) || [],
    likes: (product.likes as number) || 0,
    created_at: product.created_at as string,
    updated_at: product.updated_at as string,
  });

  // Función para incrementar likes
  const incrementLike = async (productId: string): Promise<number | null> => {
    try {
      const { data, error } = await supabase.rpc('increment_product_likes', {
        p_product_id: productId
      });

      if (error) {
        throw error;
      }

      if (data !== null && data >= 0) {
        // Actualizar estado local
        setProducts(prev => 
          prev.map(product => 
            product.id === productId 
              ? { ...product, likes: data }
              : product
          )
        );
        return data;
      }

      return null;
    } catch (err) {
      console.error('Error incrementing like:', err);
      return null;
    }
  };

  // Función para decrementar likes
  const decrementLike = async (productId: string): Promise<number | null> => {
    try {
      const { data, error } = await supabase.rpc('decrement_product_likes', {
        p_product_id: productId
      });

      if (error) {
        throw error;
      }

      if (data !== null && data >= 0) {
        // Actualizar estado local
        setProducts(prev => 
          prev.map(product => 
            product.id === productId 
              ? { ...product, likes: data }
              : product
          )
        );
        return data;
      }

      return null;
    } catch (err) {
      console.error('Error decrementing like:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    exactProducts,
    relatedProducts,
    isLoading,
    error,
    refetch: fetchProducts,
    totalCount,
    exactCount,
    relatedCount,
    incrementLike,
    decrementLike,
  };
}

// Hook para obtener un producto específico
export function useProduct(productId: string): {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('is_active', true)
        .single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          setProduct(null);
          return;
        }
        throw queryError;
      }

      if (data) {
        const transformedProduct: Product = {
          id: data.id,
          title: data.title,
          description: data.description,
          requester: data.requester,
          images: data.images || [],
          price_usd: parseFloat(data.price_usd.toString()),
          category: data.category,
          tags: data.tags || [],
          likes: data.likes || 0,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        setProduct(transformedProduct);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar producto');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  return {
    product,
    isLoading,
    error,
    refetch: fetchProduct,
  };
}

// Hook para obtener tags populares
export function usePopularTags(limit: number = 20): {
  tags: Array<{ tag: string; usage_count: number }>;
  isLoading: boolean;
  error: string | null;
} {
  const [tags, setTags] = useState<Array<{ tag: string; usage_count: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: queryError } = await supabase.rpc('get_popular_tags', {
          p_limit: limit
        });

        if (queryError) {
          throw queryError;
        }

        setTags(data || []);
      } catch (err) {
        console.error('Error fetching popular tags:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar tags populares');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularTags();
  }, [limit]);

  return {
    tags,
    isLoading,
    error,
  };
}
