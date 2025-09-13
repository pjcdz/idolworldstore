'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Edit, Trash2, Eye, Heart, DollarSign, ExternalLink, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import ProductForm from '@/components/admin-product-form';
import { ProductFilters } from '@/components/admin-advanced-filters';

interface Product {
  id: string;
  title: string;
  description: string;
  requester: string;
  images: string[];
  price_usd: number;
  category: string;
  tags: string[];
  likes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductListProps {
  filters: ProductFilters;
  onProductChange: () => void;
  onFiltersChange: (filters: ProductFilters) => void;
}

type SortableColumn = 'title' | 'price_usd' | 'likes' | 'created_at';

export default function ProductList({ 
  filters,
  onProductChange,
  onFiltersChange
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Función para manejar el sorting por columnas
  const handleSort = (column: SortableColumn) => {
    const newSortBy = column;
    const newSortOrder = 
      filters.sortBy === column && filters.sortOrder === 'asc' 
        ? 'desc' 
        : 'asc';
    
    // Disparar cambio de filtros para ordenar
    const newFilters = { 
      ...filters, 
      sortBy: newSortBy, 
      sortOrder: newSortOrder as 'asc' | 'desc'
    };
    
    // Actualizar filtros a través del callback
    onFiltersChange(newFilters);
    setCurrentPage(1);
  };

  // Función para renderizar el icono de sorting
  const renderSortIcon = (column: SortableColumn) => {
    if (filters.sortBy !== column) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    return filters.sortOrder === 'asc' 
      ? <ChevronUp className="h-4 w-4" /> 
      : <ChevronDown className="h-4 w-4" />;
  };

  // Función para crear un header clickeable
  const SortableHeader = ({ column, children }: { column: SortableColumn; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer select-none hover:bg-gray-50 transition-colors"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-2">
        {children}
        {renderSortIcon(column)}
      </div>
    </TableHead>
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('admin-token');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        include_inactive: filters.includeInactive.toString(),
      });

      if (filters.search) params.append('search', filters.search);
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.minPrice !== null) params.append('min_price', filters.minPrice.toString());
      if (filters.maxPrice !== null) params.append('max_price', filters.maxPrice.toString());
      if (filters.minLikes !== null) params.append('min_likes', filters.minLikes.toString());
      if (filters.tags.length > 0) params.append('tags', JSON.stringify(filters.tags));
      if (filters.dateRange.from) params.append('date_from', filters.dateRange.from);
      if (filters.dateRange.to) params.append('date_to', filters.dateRange.to);
      
      params.append('sort_by', filters.sortBy);
      params.append('sort_order', filters.sortOrder);

      const response = await fetch(`/api/admin/products?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }

      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError('Error al cargar productos');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      await fetchProducts();
      onProductChange();
    } catch (error) {
      setError('Error al eliminar producto');
      console.error('Error:', error);
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: !product.is_active })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar producto');
      }

      await fetchProducts();
      onProductChange();
    } catch (error) {
      setError('Error al actualizar producto');
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No se encontraron productos
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader column="title">Producto</SortableHeader>
                  <TableHead>Categoría</TableHead>
                  <SortableHeader column="price_usd">Precio</SortableHeader>
                  <SortableHeader column="likes">Likes</SortableHeader>
                  <TableHead>Estado</TableHead>
                  <SortableHeader column="created_at">Fecha</SortableHeader>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium line-clamp-1">{product.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {product.price_usd.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        {product.likes}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.is_active ? 'default' : 'destructive'}>
                        {product.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {formatDate(product.created_at)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(product)}
                        >
                          {product.is_active ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Página {currentPage} de {totalPages}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* View Product Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedProduct.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Precio:</span>
                      <span className="text-lg font-bold">${selectedProduct.price_usd.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Categoría:</span>
                      <Badge>{selectedProduct.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Solicitante:</span>
                      <span>{selectedProduct.requester}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Likes:</span>
                      <span>{selectedProduct.likes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Estado:</span>
                      <Badge variant={selectedProduct.is_active ? 'default' : 'destructive'}>
                        {selectedProduct.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                  </div>

                  {selectedProduct.tags.length > 0 && (
                    <div className="mt-4">
                      <span className="font-medium">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProduct.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {selectedProduct.images.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Imágenes:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProduct.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`${selectedProduct.title} ${index + 1}`}
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <a
                              href={image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-500 border-t pt-4">
                <div>Creado: {formatDate(selectedProduct.created_at)}</div>
                <div>Última actualización: {formatDate(selectedProduct.updated_at)}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm
              product={selectedProduct}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                fetchProducts();
                onProductChange();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
