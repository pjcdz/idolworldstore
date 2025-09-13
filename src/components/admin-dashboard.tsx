'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, Plus, Search, Filter } from 'lucide-react';
import ProductList from '@/components/admin-product-list';
import ProductForm from '@/components/admin-product-form';
import AdminStats from '@/components/admin-stats';
import AdvancedFilters, { ProductFilters } from '@/components/admin-advanced-filters';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>({
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

  const handleProductChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Panel Administrativo</h1>
            </div>
            <Button onClick={onLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="new-product">Nuevo Producto</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminStats key={refreshKey} onStatsChange={handleProductChange} />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Productos</CardTitle>
                <CardDescription>
                  Administra todos los productos de la tienda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <AdvancedFilters
                    currentFilters={filters}
                    onFiltersChange={handleFiltersChange}
                  />

                  <ProductList
                    filters={filters}
                    onProductChange={handleProductChange}
                    onFiltersChange={handleFiltersChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new-product">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Producto</CardTitle>
                <CardDescription>
                  Agrega un nuevo producto al catálogo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductForm
                  onSuccess={() => {
                    setActiveTab('products');
                    handleProductChange();
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
