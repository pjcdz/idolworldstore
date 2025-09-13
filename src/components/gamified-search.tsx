'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  variant?: 'default' | 'sidebar'; // Nueva prop para variant
}

export default function GameifiedSearch({ onFiltersChange, variant = 'default' }: GameifiedSearchProps) {
  const [step, setStep] = useState<'group' | 'member' | 'category' | 'results'>('group');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const [groups, setGroups] = useState<Group[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  
  const [loading, setLoading] = useState(false);

  // Cargar grupos disponibles
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/groups?include_count=true');
      const data = await response.json();
      setGroups(data.groups || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async (groupName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/groups/${encodeURIComponent(groupName)}`);
      const data = await response.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async (groupName: string, memberName?: string) => {
    setLoading(true);
    try {
      // Construir los tags para el filtro
      const tags = [groupName];
      if (memberName && memberName !== 'ALL') {
        tags.push(memberName);
      }

      // Obtener productos que coincidan con los filtros
      const params = new URLSearchParams({
        tags: JSON.stringify(tags),
        include_categories: 'true'
      });

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      
      // Contar productos por categoría
      const categoryCounts = new Map();
      let totalProducts = 0;

      data.products?.forEach((product: { category?: string }) => {
        const category = product.category || 'Other';
        categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
        totalProducts++;
      });

      // Convertir a array y agregar "Todos"
      const categoryArray = Array.from(categoryCounts.entries()).map(([category, count]) => ({
        category,
        count
      }));

      // Agregar opción "Todos" al principio
      if (totalProducts > 0) {
        categoryArray.unshift({ category: 'ALL', count: totalProducts });
      }

      setCategories(categoryArray);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

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
    
    // Continuar con la carga de miembros para permitir navegación posterior
    fetchMembers(groupName);
    setStep('member');
  };

  const handleMemberSelect = (memberName: string) => {
    setSelectedMember(memberName);
    setSelectedCategory('');
    
    // Actualizar filtros inmediatamente cuando se selecciona un miembro
    const filters: {
      tags: string[];
      include_related: boolean;
      category?: string;
    } = {
      tags: [selectedGroup],
      include_related: true
    };
    
    if (memberName !== 'ALL') {
      filters.tags.push(memberName);
    }
    
    onFiltersChange(filters);
    
    fetchCategories(selectedGroup, memberName);
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
    fetchMembers(selectedGroup);
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

  // Si es variant sidebar, usar un layout más compacto
  if (variant === 'sidebar') {
    return (
      <div className="space-y-4">
        {/* Breadcrumb y status para sidebar */}
        {(selectedGroup || selectedMember || selectedCategory) && (
          <div className="space-y-3">
            {/* Status message */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald-600">🎯</span>
                <span className="font-medium text-emerald-800 text-sm">¡Aquí están tus productos!</span>
              </div>
              <p className="text-xs text-emerald-600">
                Los productos se están mostrando según tu selección
              </p>
            </div>
            
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-1 text-xs">
              {selectedGroup && (
                <>
                  <button
                    onClick={navigateToGroup}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                  >
                    {selectedGroup === 'TOMORROW X TOGETHER' ? 'TXT' : selectedGroup}
                  </button>
                  {(selectedMember || selectedCategory) && <span className="text-gray-400">→</span>}
                </>
              )}

              {selectedMember && selectedMember !== 'ALL' && (
                <>
                  <button
                    onClick={navigateToMember}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    disabled={!selectedCategory}
                  >
                    {selectedMember}
                  </button>
                  {selectedCategory && <span className="text-gray-400">→</span>}
                </>
              )}

              {selectedCategory && selectedCategory !== 'ALL' && (
                <div className="px-2 py-1 bg-green-100 text-green-700 rounded-md">
                  {selectedCategory}
                </div>
              )}
              
              {/* Botón reiniciar más pequeño */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetSearch}
                className="ml-2 h-6 px-2 text-xs"
              >
                🔄 Reiniciar
              </Button>
            </div>
          </div>
        )}

        {/* Botón para buscar algo diferente si hay filtros aplicados */}
        {step === 'results' && (
          <Button 
            variant="outline" 
            onClick={resetSearch}
            className="w-full text-sm"
            size="sm"
          >
            🔍 Buscar algo diferente
          </Button>
        )}

        {/* Mostrar pasos solo si no hay filtros aplicados */}
        {step === 'group' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700 text-sm">📦 ¿Qué tipo de producto buscas?</h4>
              <p className="text-xs text-gray-500">Filtra por el tipo de producto que más te interesa</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {loading ? (
                <div className="text-center py-4 text-sm text-gray-500">
                  Cargando grupos...
                </div>
              ) : groups.length > 0 ? (
                groups.map((group) => (
                  <Button
                    key={group.group_name}
                    variant="outline"
                    className="h-auto p-3 flex items-center justify-between hover:bg-primary hover:text-primary-foreground transition-colors text-left"
                    onClick={() => handleGroupSelect(group.group_name)}
                  >
                    <span className="font-medium text-sm">
                      {group.group_name === 'TOMORROW X TOGETHER' ? 'TXT' : group.group_name}
                    </span>
                    <Badge variant="secondary" className="text-xs ml-2">
                      {formatProductCount(group.product_count)}
                    </Badge>
                  </Button>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">
                  No hay grupos disponibles
                </div>
              )}
            </div>
          </div>
        )}

        {step === 'member' && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 text-sm">¿Qué tipo de producto buscas de {selectedGroup}?</h4>
            
            <div className="grid grid-cols-1 gap-2">
              {loading ? (
                <div className="text-center py-4 text-sm text-gray-500">
                  Cargando miembros...
                </div>
              ) : members.length > 0 ? (
                members.map((member) => (
                  <Button
                    key={member.member_name}
                    variant={member.member_name === 'ALL' ? 'default' : 'outline'}
                    className="h-auto p-3 flex items-center justify-between"
                    onClick={() => handleMemberSelect(member.member_name)}
                  >
                    <span className="font-medium text-sm">
                      {member.member_name === 'ALL' ? '🌟 Todos' : member.member_name}
                    </span>
                    <Badge variant="secondary" className="text-xs ml-2">
                      {formatProductCount(member.product_count)}
                    </Badge>
                  </Button>
                ))
              ) : (
                <Button
                  variant="default"
                  onClick={() => handleMemberSelect('ALL')}
                  className="text-sm"
                >
                  Ver todos los productos
                </Button>
              )}
            </div>
          </div>
        )}

        {step === 'category' && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 text-sm">
              ¿Qué tipo de producto buscas de {selectedGroup}
              {selectedMember && selectedMember !== 'ALL' ? ` → ${selectedMember}` : ''}?
            </h4>
            
            <div className="grid grid-cols-1 gap-2">
              {loading ? (
                <div className="text-center py-4 text-sm text-gray-500">
                  Cargando categorías...
                </div>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <Button
                    key={cat.category}
                    variant={cat.category === 'ALL' ? 'default' : 'outline'}
                    className="h-auto p-3 flex items-center justify-between hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleCategorySelect(cat.category)}
                  >
                    <div className="flex items-center gap-2">
                      <span>
                        {cat.category === 'ALL' && '🌟'}
                        {cat.category === 'Albums' && '💿'}
                        {cat.category === 'Light Sticks' && '🔦'}
                        {cat.category === 'Vinyl' && '📀'}
                        {cat.category === 'Accessories' && '🎁'}
                        {!['ALL', 'Albums', 'Light Sticks', 'Vinyl', 'Accessories'].includes(cat.category) && '📦'}
                      </span>
                      <span className="font-medium text-sm">
                        {cat.category === 'ALL' ? 'Todos' : cat.category}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {formatProductCount(cat.count)}
                    </Badge>
                  </Button>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">
                  No hay productos disponibles
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Layout por defecto (modal/fixed)
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
            {loading ? (
              <div className="col-span-full text-center py-8">
                Cargando grupos disponibles...
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
              {loading ? (
                <div className="col-span-full text-center py-8">
                  Cargando miembros...
                </div>
              ) : members.length > 0 ? (
                members.map((member) => (
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
