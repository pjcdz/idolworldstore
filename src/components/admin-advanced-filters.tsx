'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

interface AdvancedFiltersProps {
  onFiltersChange: (filters: ProductFilters) => void;
  currentFilters: ProductFilters;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  minLikes: number | null;
  tags: string[];
  sortBy: 'created_at' | 'updated_at' | 'likes' | 'price_usd' | 'title';
  sortOrder: 'asc' | 'desc';
  includeInactive: boolean;
  dateRange: {
    from: string | null;
    to: string | null;
  };
}

const CATEGORIES = [
  'all',
  'Albums',
  'Light Sticks', 
  'Vinyl',
  'Accessories'
];

const KPOP_GROUPS = [
  'TWICE', 'STRAY KIDS', 'TOMORROW X TOGETHER', 'TXT',
  'BLACKPINK', 'NEWJEANS', 'ITZY', 'AESPA', 'IVE', 
  '(G)I-DLE', 'LE SSERAFIM', 'NMIXX'
];

const COMMON_TAGS = [
  'Official', 'Limited Edition', 'Exclusive', 'Set', 'Version 2', 'Standard',
  'Photocard', 'Photobook', 'POB', 'Random', 'Digipack', 'Concert'
];

const SORT_OPTIONS = [
  { value: 'created_at', label: 'Fecha de creación' },
  { value: 'updated_at', label: 'Última actualización' },
  { value: 'likes', label: 'Número de likes' },
  { value: 'price_usd', label: 'Precio' },
  { value: 'title', label: 'Nombre' }
];

export default function AdvancedFilters({ onFiltersChange, currentFilters }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const updateFilters = (updates: Partial<ProductFilters>) => {
    const newFilters = { ...currentFilters, ...updates };
    onFiltersChange(newFilters);
  };

  const addTag = () => {
    if (newTag.trim() && !currentFilters.tags.includes(newTag.trim())) {
      updateFilters({
        tags: [...currentFilters.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const addSuggestedTag = (tag: string) => {
    if (!currentFilters.tags.includes(tag)) {
      updateFilters({
        tags: [...currentFilters.tags, tag]
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFilters({
      tags: currentFilters.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      category: 'all',
      minPrice: null,
      maxPrice: null,
      minLikes: null,
      tags: [],
      sortBy: 'created_at',
      sortOrder: 'desc',
      includeInactive: false,
      dateRange: { from: null, to: null }
    });
  };

  const hasActiveFilters = 
    currentFilters.search ||
    currentFilters.category !== 'all' ||
    currentFilters.minPrice !== null ||
    currentFilters.maxPrice !== null ||
    currentFilters.minLikes !== null ||
    currentFilters.tags.length > 0 ||
    currentFilters.sortBy !== 'created_at' ||
    currentFilters.sortOrder !== 'desc' ||
    currentFilters.includeInactive ||
    currentFilters.dateRange.from ||
    currentFilters.dateRange.to;

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filtros Avanzados</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    Filtros activos
                  </Badge>
                )}
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Search and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search">Búsqueda</Label>
                <Input
                  id="search"
                  placeholder="Buscar por título o descripción..."
                  value={currentFilters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={currentFilters.category}
                  onValueChange={(value) => updateFilters({ category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'Todas las categorías' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label>Rango de Precios (USD)</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Input
                    type="number"
                    placeholder="Precio mínimo"
                    value={currentFilters.minPrice ?? ''}
                    onChange={(e) => updateFilters({ 
                      minPrice: e.target.value ? parseFloat(e.target.value) : null 
                    })}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Precio máximo"
                    value={currentFilters.maxPrice ?? ''}
                    onChange={(e) => updateFilters({ 
                      maxPrice: e.target.value ? parseFloat(e.target.value) : null 
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Likes and Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="minLikes">Likes mínimos</Label>
                <Input
                  id="minLikes"
                  type="number"
                  placeholder="0"
                  value={currentFilters.minLikes ?? ''}
                  onChange={(e) => updateFilters({ 
                    minLikes: e.target.value ? parseInt(e.target.value) : null 
                  })}
                />
              </div>
              <div>
                <Label htmlFor="dateFrom">Desde</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={currentFilters.dateRange.from ?? ''}
                  onChange={(e) => updateFilters({ 
                    dateRange: { ...currentFilters.dateRange, from: e.target.value || null }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="dateTo">Hasta</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={currentFilters.dateRange.to ?? ''}
                  onChange={(e) => updateFilters({ 
                    dateRange: { ...currentFilters.dateRange, to: e.target.value || null }
                  })}
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Etiquetas</Label>
              <div className="space-y-3 mt-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Agregar etiqueta..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Agregar
                  </Button>
                </div>
                
                {/* Tags Sugeridos */}
                <div className="space-y-2">
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
                          onClick={() => addSuggestedTag(group)}
                          disabled={currentFilters.tags.includes(group)}
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
                          onClick={() => addSuggestedTag(tag)}
                          disabled={currentFilters.tags.includes(tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {currentFilters.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentFilters.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTag(tag)}
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

            {/* Sort and Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sortBy">Ordenar por</Label>
                <Select
                  value={currentFilters.sortBy}
                  onValueChange={(value: 'created_at' | 'updated_at' | 'likes' | 'price_usd' | 'title') => updateFilters({ sortBy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sortOrder">Orden</Label>
                <Select
                  value={currentFilters.sortOrder}
                  onValueChange={(value: 'asc' | 'desc') => updateFilters({ sortOrder: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descendente</SelectItem>
                    <SelectItem value="asc">Ascendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeInactive"
                    checked={currentFilters.includeInactive}
                    onChange={(e) => updateFilters({ includeInactive: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="includeInactive" className="text-sm">
                    Incluir inactivos
                  </Label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-500">
                {hasActiveFilters ? 'Hay filtros aplicados' : 'No hay filtros aplicados'}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={clearAllFilters}
                disabled={!hasActiveFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
