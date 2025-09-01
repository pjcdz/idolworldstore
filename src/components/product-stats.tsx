'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ProductStatsProps {
  totalProducts: number;
  selectedFilters: {
    group?: string;
    member?: string;
    category?: string;
  };
  isLoading?: boolean;
}

export default function ProductStats({ totalProducts, selectedFilters, isLoading }: ProductStatsProps) {
  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasFilters = selectedFilters.group || selectedFilters.member || selectedFilters.category;
  
  if (!hasFilters) {
    return null;
  }

  return (
    <Card className="mb-6 border-l-4 border-l-purple-500">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold text-gray-900">
                {totalProducts === 0 
                  ? 'No se encontraron productos' 
                  : `${totalProducts} producto${totalProducts !== 1 ? 's' : ''} encontrado${totalProducts !== 1 ? 's' : ''}`
                }
              </p>
              <div className="flex items-center gap-2 mt-1">
                {selectedFilters.group && (
                  <Badge variant="default" className="text-xs">
                    {selectedFilters.group}
                  </Badge>
                )}
                {selectedFilters.member && selectedFilters.member !== 'ALL' && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <Badge variant="secondary" className="text-xs">
                      {selectedFilters.member}
                    </Badge>
                  </>
                )}
                {selectedFilters.category && selectedFilters.category !== 'ALL' && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <Badge variant="outline" className="text-xs">
                      {selectedFilters.category}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Right-side callout removed per request */}
        </div>
        
        {totalProducts === 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 <strong>Tip:</strong> Prueba con otros filtros o busca productos de otros grupos
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
