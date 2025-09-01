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
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalCount: number;
  incrementLike: (productId: string) => Promise<number | null>;
  decrementLike: (productId: string) => Promise<number | null>;
}

export function useProducts(filters: ProductsFilters = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      // Aplicar filtros
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
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

      if (queryError) {
        throw queryError;
      }

      // Transformar los datos para que coincidan con la interfaz esperada
      const transformedProducts: Product[] = (data || []).map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        requester: product.requester,
        images: product.images || [],
        price_usd: parseFloat(product.price_usd.toString()),
        category: product.category,
        tags: product.tags || [],
        likes: product.likes || 0,
        created_at: product.created_at,
        updated_at: product.updated_at,
      }));

      setProducts(transformedProducts);
      setTotalCount(count || 0);
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
  ]);

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
    isLoading,
    error,
    refetch: fetchProducts,
    totalCount,
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
