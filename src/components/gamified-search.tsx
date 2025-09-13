'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCachedMetadata, useCachedGroupMembers } from '@/hooks/use-cached-metadata';
import { Product } from '@/hooks/use-products';

interface Group {
  group_name: string;
  product_count: number;
}

interface Member {
  member_name: string;
  product_count: number;
}

interface CategoryCount {
  category: string;
  count: number;
}

// Helper function para manejar singular/plural
const formatProductCount = (count: number) => {
  return count === 1 ? `${count} producto` : `${count} productos`;
};

interface GameifiedSearchProps {
  onFiltersChange: (filters: {
    group?: string;
    member?: string;
    category?: string;
    tags?: string[];
  }) => void;
  products?: Product[]; // Productos para usar como cache
}

export default function GameifiedSearch({ onFiltersChange, products = [] }: GameifiedSearchProps) {
  const [step, setStep] = useState<'group' | 'member' | 'category' | 'results'>('group');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Usar cache en lugar de hacer peticiones HTTP
  const { groups, categories, isReady } = useCachedMetadata(products);
  const groupMembers = useCachedGroupMembers(products, selectedGroup);

  // Estado para tracking de loading (ya no necesario pero lo mantenemos para la UI)
  const [loading, setLoading] = useState(false);

  const handleGroupSelect = (groupName: string) => {
    setSelectedGroup(groupName);
    setSelectedMember('');
    setSelectedCategory('');
    
    // Inmediatamente aplicar filtro del grupo y mostrar productos
    const filters: {
      tags: string[];
      include_related: boolean;
    } = {
      tags: [groupName],
      include_related: true // Activar productos relacionados
    };
    
    onFiltersChange(filters);
    
    // Ir al paso de miembros (ya no necesitamos cargar, todo está en cache)
    setStep('member');
  };

  const handleMemberSelect = (memberName: string) => {
    setSelectedMember(memberName);
    setSelectedCategory('');
    // Ya no necesitamos fetchCategories, todo está en cache
    setStep('category');
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setStep('results');
    
    // Construir filtros y notificar al componente padre
    const filters: {
      tags: string[];
      include_related: boolean;
      category?: string;
    } = {
      tags: [selectedGroup],
      include_related: true // Activar productos relacionados
    };
    
    if (selectedMember && selectedMember !== 'ALL') {
      filters.tags.push(selectedMember);
    }
    
    if (categoryName !== 'ALL') {
      filters.category = categoryName;
    }
    
    onFiltersChange(filters);
  };

  const resetSearch = () => {
    setStep('group');
    setSelectedGroup('');
    setSelectedMember('');
    setSelectedCategory('');
    onFiltersChange({});
  };

  // Funciones de navegación hacia atrás
  const navigateToGroup = () => {
    setStep('group');
    setSelectedGroup('');
    setSelectedMember('');
    setSelectedCategory('');
    onFiltersChange({});
  };

  const navigateToMember = () => {
    if (!selectedGroup) return;
    setStep('member');
    setSelectedMember('');
    setSelectedCategory('');
    // Ya no necesitamos fetchMembers, todo está en cache
    onFiltersChange({});
  };

  // Remove unused function
  // const navigateToCategory = () => {
  //   if (!selectedGroup) return;
  //   setStep('category');
  //   setSelectedCategory('');
  //   fetchCategories(selectedGroup, selectedMember);
  //   onFiltersChange({});
  // };

  const getStepTitle = () => {
    switch (step) {
      case 'group':
        return '🎵 ¡Elige tu Grupo Favorito!';
      case 'member':
        return `👥 ¿Algún miembro especial de ${selectedGroup}?`;
      case 'category':
        return '📦 ¿Qué tipo de producto buscas?';
      case 'results':
        return '✨ ¡Aquí están tus productos!';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'group':
        return 'Descubre productos exclusivos de tus artistas favoritos';
      case 'member':
        return 'Encuentra productos específicos de tu bias o ve todo el contenido grupal';
      case 'category':
        return 'Filtra por el tipo de producto que más te interesa';
      case 'results':
        // Do not show a description on results step
        return '';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
        </div>
        {getStepDescription() && (
          <CardDescription className="text-lg">
            {getStepDescription()}
          </CardDescription>
        )}
        
        {/* Breadcrumb de progreso navegable */}
        {(selectedGroup || selectedMember || selectedCategory) && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {/* Grupo seleccionado - siempre clickeable */}
            {selectedGroup && (
              <>
                <button
                  onClick={navigateToGroup}
                  className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  {selectedGroup === 'TOMORROW X TOGETHER' ? 'TXT' : selectedGroup}
                </button>
                {(selectedMember || selectedCategory) && <span className="text-gray-400">→</span>}
              </>
            )}

            {/* Miembro seleccionado - clickeable si hay categoría */}
            {selectedMember && selectedMember !== 'ALL' && (
              <>
                <button
                  onClick={navigateToMember}
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                    selectedCategory 
                      ? 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer'
                      : 'bg-primary text-primary-foreground cursor-default'
                  }`}
                  disabled={!selectedCategory}
                >
                  {selectedMember}
                </button>
                {selectedCategory && <span className="text-gray-400">→</span>}
              </>
            )}

            {/* Categoría seleccionada - no clickeable (es el paso actual) */}
            {selectedCategory && selectedCategory !== 'ALL' && (
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground">
                {selectedCategory}
              </div>
            )}

            {/* Botón de reiniciar */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetSearch}
              className="ml-4"
            >
              🔄 Reiniciar
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {/* Paso 1: Seleccionar Grupo */}
        {step === 'group' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!isReady ? (
              <div className="col-span-full text-center py-8">
                Preparando grupos disponibles...
              </div>
            ) : groups.length > 0 ? (
              groups.map((group) => (
                <Button
                  key={group.group_name}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleGroupSelect(group.group_name)}
                >
                  <span className="font-semibold text-center text-sm leading-tight">
                    {group.group_name === 'TOMORROW X TOGETHER' ? 'TXT' : group.group_name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {formatProductCount(group.product_count)}
                  </Badge>
                </Button>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No hay grupos disponibles en este momento
              </div>
            )}
          </div>
        )}

        {/* Paso 2: Seleccionar Miembro */}
        {step === 'member' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Miembros de {selectedGroup} disponibles:</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {!isReady ? (
                <div className="col-span-full text-center py-8">
                  Preparando miembros...
                </div>
              ) : groupMembers.length > 0 ? (
                groupMembers.map((member) => (
                  <Button
                    key={member.member_name}
                    variant={member.member_name === 'ALL' ? 'default' : 'outline'}
                    className="h-auto p-3 flex flex-col items-center gap-1"
                    onClick={() => handleMemberSelect(member.member_name)}
                  >
                    <span className="font-medium text-sm">
                      {member.member_name === 'ALL' ? '🌟 Todos' : member.member_name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {formatProductCount(member.product_count)}
                    </Badge>
                  </Button>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <Button
                    variant="default"
                    onClick={() => handleMemberSelect('ALL')}
                  >
                    Ver todos los productos de {selectedGroup}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Paso 3: Seleccionar Categoría */}
        {step === 'category' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                ¿Qué tipo de producto buscas de {selectedGroup}
                {selectedMember && selectedMember !== 'ALL' ? ` → ${selectedMember}` : ''}?
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  Cargando categorías disponibles...
                </div>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <Button
                    key={cat.category}
                    variant={cat.category === 'ALL' ? 'default' : 'outline'}
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleCategorySelect(cat.category)}
                  >
                    <span className="text-xl">
                      {cat.category === 'ALL' && '🌟'}
                      {cat.category === 'Albums' && '💿'}
                      {cat.category === 'Light Sticks' && '🔦'}
                      {cat.category === 'Vinyl' && '📀'}
                      {cat.category === 'Accessories' && '🎁'}
                      {!['ALL', 'Albums', 'Light Sticks', 'Vinyl', 'Accessories'].includes(cat.category) && '📦'}
                    </span>
                    <span className="font-medium text-sm text-center">
                      {cat.category === 'ALL' ? 'Todos' : cat.category}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {formatProductCount(cat.count)}
                    </Badge>
                  </Button>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No hay productos disponibles para esta combinación
                </div>
              )}
            </div>
          </div>
        )}

        {/* Paso 4: Mostrar filtros aplicados */}
        {step === 'results' && (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium">
                🎯 Filtros aplicados correctamente
              </p>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Los productos se están mostrando abajo según tu selección
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={resetSearch}
              className="w-full max-w-xs"
            >
              🔍 Buscar algo diferente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
