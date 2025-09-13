'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, ExternalLink } from 'lucide-react';

interface Product {
  id?: string;
  title: string;
  description: string;
  requester: string;
  images: string[];
  price_usd: number;
  category: string;
  tags: string[];
  likes?: number;
  is_active?: boolean;
}

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

const CATEGORIES = [
  'Albums',
  'Light Sticks',
  'Vinyl', 
  'Accessories'
];

const KPOP_GROUPS = [
  'TWICE', 'STRAY KIDS', 'TOMORROW X TOGETHER', 'TXT',
  'BLACKPINK', 'aespa', 'ITZY', '(G)I-DLE', 'NewJeans', 
  'IVE', 'LE SSERAFIM', 'SEVENTEEN'
];

const COMMON_TAGS = [
  'Official', 'Limited Edition', 'Exclusive', 'Set', 'Version 2', 'Standard',
  'Photocard', 'Photobook', 'POB', 'Random', 'Digipack', 'Concert'
];

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    title: '',
    description: '',
    requester: 'Admin',
    images: [],
    price_usd: 0,
    category: '',
    tags: []
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleInputChange = (field: keyof Product, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleAddSuggestedTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('admin-token');
      const url = product 
        ? `/api/admin/products/${product.id}` 
        : '/api/admin/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar producto');
      }

      onSuccess();
      
      // Reset form if creating new product
      if (!product) {
        setFormData({
          title: '',
          description: '',
          requester: 'Admin',
          images: [],
          price_usd: 0,
          category: '',
          tags: []
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al guardar producto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Nombre del producto"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descripción detallada del producto"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="requester">Solicitante</Label>
              <Input
                id="requester"
                value={formData.requester}
                onChange={(e) => handleInputChange('requester', e.target.value)}
                placeholder="Nombre del solicitante"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Precio (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price_usd}
                  onChange={(e) => handleInputChange('price_usd', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images and Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Multimedia y Etiquetas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Images */}
            <div>
              <Label>Imágenes</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="URL de la imagen"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                  />
                  <Button type="button" onClick={handleAddImage} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.images.length > 0 && (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex items-center space-x-2">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-8 h-8 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-image.png';
                            }}
                          />
                          <span className="text-sm truncate max-w-[200px]">{image}</span>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(image, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Etiquetas</Label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nueva etiqueta"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Tags Sugeridos */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Grupos K-pop</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {KPOP_GROUPS.map((group) => (
                        <Button
                          key={group}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleAddSuggestedTag(group)}
                          disabled={formData.tags.includes(group)}
                        >
                          {group}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-600">Tags Comunes</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {COMMON_TAGS.map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleAddSuggestedTag(tag)}
                          disabled={formData.tags.includes(tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveTag(tag)}
                          className="h-auto p-0 ml-1"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : (product ? 'Actualizar Producto' : 'Crear Producto')}
        </Button>
      </div>
    </form>
  );
}
