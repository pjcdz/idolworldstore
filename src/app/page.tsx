"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { LikesLoadingSkeleton } from "@/components/likes-loading-skeleton";
import { ExchangeRateIndicator } from "@/components/exchange-rate-indicator";
import GameifiedSearch from "@/components/gamified-search";
import ProductStats from "@/components/product-stats";
import ProductImageCarousel from "@/components/product-image-carousel";
import { useProducts, type Product } from "@/hooks/use-products";
import { useExchangeRate } from "@/hooks/use-exchange-rate";

// Extender la interfaz Product para compatibilidad con el componente existente
interface ProductWithPrices extends Product {
  priceUSD: number; // Alias para compatibilidad
  priceARS: number; // Calculado dinámicamente
}

export default function HomePage() {
  // Estado para filtros de búsqueda gamificada
  const [searchFilters, setSearchFilters] = useState<{
    group?: string;
    member?: string;
    category?: string;
    tags?: string[];
  }>({});

  // Estado para mostrar/ocultar el componente de búsqueda como fixed
  const [showSearchFixed, setShowSearchFixed] = useState(false);

  // Obtener productos desde la base de datos con filtros
  const searchFiltersWithRelated = {
    ...searchFilters,
    include_related: true // Habilitar búsqueda progresiva
  };
  
  const { 
    products, 
    exactProducts,
    relatedProducts,
    isLoading: isLoadingProducts, 
    error: productsError,
    refetch: refetchProducts,
    exactCount,
    relatedCount
  } = useProducts(searchFiltersWithRelated);

  // Obtener tipo de cambio USD/ARS
  const { convertUsdToArs, isLoading: isLoadingRate } = useExchangeRate();

  // Transformar productos con precios calculados
  const transformProducts = (productList: Product[]): ProductWithPrices[] => 
    productList.map(product => ({
      ...product,
      priceUSD: product.price_usd, // Alias para compatibilidad
      priceARS: convertUsdToArs(product.price_usd), // Calculado dinámicamente
    }));

  const exactProducts_transformed = transformProducts(exactProducts);
  const relatedProducts_transformed = transformProducts(relatedProducts);
  const products_transformed = transformProducts(products); // Para compatibilidad con el código existente
  
  // Modal state for image gallery
  const [modalData, setModalData] = useState<{
    images: string[];
    currentIndex: number;
    productTitle: string;
  } | null>(null);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalData) {
        if (event.key === "Escape") {
          closeModal();
        } else if (event.key === "ArrowLeft") {
          navigateModal(-1);
        } else if (event.key === "ArrowRight") {
          navigateModal(1);
        }
      }
    };

    if (modalData && typeof window !== 'undefined') {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      }
    };
  }, [modalData]);

  // Event listener global para abrir el componente al hacer click en cualquier parte - Solo mobile
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Solo funciona en mobile
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        return;
      }

      const target = event.target as HTMLElement;
      
      // No abrir si se hace click en el header, botones, o elementos interactivos
      if (
        target.closest('header') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('[role="button"]') ||
        target.closest('.gamified-search-fixed') ||
        target.closest('img') ||  // Evitar abrir al hacer click en imágenes
        target.closest('[data-modal]') ||  // Evitar abrir al hacer click en elementos del modal
        target.closest('.cursor-pointer') ||  // Evitar abrir al hacer click en elementos clickeables
        showSearchFixed // No abrir si ya está abierto
      ) {
        return;
      }
      
      // Abrir el componente
      setShowSearchFixed(true);
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('click', handleGlobalClick);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', handleGlobalClick);
      }
    };
  }, [showSearchFixed]);

  // Handle keyboard navigation for search fixed - Solo mobile
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Solo funciona en mobile
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        return;
      }
      
      if (showSearchFixed && event.key === "Escape") {
        handleCloseFixed();
      }
    };

    if (showSearchFixed && typeof window !== 'undefined') {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [showSearchFixed]);

  const openModal = (imageUrl: string, allImages?: string[], productTitle?: string) => {
    if (allImages && allImages.length > 0) {
      const currentIndex = allImages.findIndex(img => img === imageUrl);
      setModalData({
        images: allImages,
        currentIndex: currentIndex >= 0 ? currentIndex : 0,
        productTitle: productTitle || ''
      });
    } else {
      setModalData({
        images: [imageUrl],
        currentIndex: 0,
        productTitle: productTitle || ''
      });
    }
  };

  const closeModal = () => {
    setModalData(null);
  };

  const navigateModal = useCallback((direction: number) => {
    if (!modalData) return;
    
    const newIndex = modalData.currentIndex + direction;
    if (newIndex >= 0 && newIndex < modalData.images.length) {
      setModalData({
        ...modalData,
        currentIndex: newIndex
      });
    }
  }, [modalData]);

  // Función para manejar ambos botones (filtros y búsqueda) - abren/cierran el GameifiedSearch fixed - Solo mobile
  const handleSearchToggle = () => {
    setShowSearchFixed(!showSearchFixed);
  };

  // Función para cerrar el componente fixed
  const handleCloseFixed = () => {
    setShowSearchFixed(false);
  };

  // Función para contar filtros activos
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchFilters.group) count++;
    if (searchFilters.member && searchFilters.member !== 'ALL') count++;
    if (searchFilters.category && searchFilters.category !== 'ALL') count++;
    if (searchFilters.tags && searchFilters.tags.length > 0) count++;
    return count;
  };

  // Si hay error cargando productos, mostrar mensaje
  if (productsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error al cargar productos
          </h2>
          <p className="text-gray-600 mb-4">{productsError}</p>
          <Button onClick={refetchProducts}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const isLoading = isLoadingProducts || isLoadingRate;

  // Función para renderizar una lista de productos (Mobile)
  const renderProductList = (productList: ProductWithPrices[], sectionTitle?: string) => {
    if (productList.length === 0) return null;

    return (
      <>
        {sectionTitle && sectionTitle !== 'exact' && sectionTitle !== 'related' && (
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <h3 className="text-lg font-semibold text-gray-700 px-4 bg-gray-50 rounded-full">
              {sectionTitle}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        )}
        
        {productList.map((product, index) => {
          // Crear clave única combinando ID con contexto de la sección
          const uniqueKey = sectionTitle ? `${sectionTitle}-${product.id}-${index}` : `${product.id}-${index}`;

          return (
            <div
              key={uniqueKey}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-out hover:transform hover:-translate-y-1.5 hover:shadow-xl border border-gray-200/50 mb-6 flex flex-col"
            >
            {/* Image Carousel Section */}
            <div className="relative">
              <ProductImageCarousel
                images={product.images}
                productTitle={product.title}
                onImageClick={openModal}
                className="relative"
              />

              {/* WhatsApp Button - Top Right */}
              <div className="absolute top-3 right-3">
                <WhatsAppButton 
                  product={product}
                  variant="icon"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="mb-2">
                <Badge
                  variant="outline"
                  className="text-xs text-gray-600 mb-2"
                >
                  {product.category}
                </Badge>
              </div>

              <h2
                className="text-lg font-semibold text-gray-900 mb-2 leading-tight"
                title={product.title}
              >
                {product.title}
              </h2>

              {product.description && (
                <p className="text-sm text-gray-700 mb-3">
                  {product.description}
                </p>
              )}

              {/* Price Section */}
              <div className="flex justify-between items-center mb-4 flex-grow">
                <div className="text-gray-900">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-purple-600">
                      ${product.priceUSD} USD
                    </span>
                    <span className="text-sm text-gray-600">
                      ≈ ${product.priceARS.toLocaleString()} ARS
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Contact Button - Siempre al final */}
              <div className="mt-auto">
                <WhatsAppButton 
                  product={product}
                  variant="button"
                />
              </div>
            </div>
          </div>
          );
        })}
      </>
    );
  };

  // Función para renderizar grid de productos (Desktop)
  const renderProductGrid = (productList: ProductWithPrices[]) => {
    if (productList.length === 0) return null;

    return productList.map((product, index) => {
      const uniqueKey = `grid-${product.id}-${index}`;

      return (
        <div
          key={uniqueKey}
          className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-out hover:transform hover:-translate-y-1.5 hover:shadow-xl border border-gray-200/50 flex flex-col h-full"
        >
          {/* Image Carousel Section */}
          <div className="relative">
            <ProductImageCarousel
              images={product.images}
              productTitle={product.title}
              onImageClick={openModal}
              className="relative"
            />

            {/* WhatsApp Button - Top Right */}
            <div className="absolute top-3 right-3">
              <WhatsAppButton 
                product={product}
                variant="icon"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="mb-2">
              <Badge
                variant="outline"
                className="text-xs text-gray-600 mb-2"
              >
                {product.category}
              </Badge>
            </div>

            <h2
              className="text-lg font-semibold text-gray-900 mb-2 leading-tight line-clamp-2"
              title={product.title}
            >
              {product.title}
            </h2>

            {product.description && (
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Price Section */}
            <div className="mb-4 flex-grow">
              <div className="text-gray-900">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-purple-600">
                    ${product.priceUSD} USD
                  </span>
                  <span className="text-sm text-gray-600">
                    ≈ ${product.priceARS.toLocaleString()} ARS
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp Contact Button - Siempre al final */}
            <div className="mt-auto">
              <WhatsAppButton 
                product={product}
                variant="button"
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Solo mobile */}
      <div className="lg:hidden">
        <Header
          secondIcon="filter_list"
          rightIcon="search"
          secondIconAction={handleSearchToggle}
          rightIconAction={handleSearchToggle}
          secondIconActive={showSearchFixed}
          rightIconActive={showSearchFixed}
          secondIconBadge={getActiveFiltersCount()}
        />
      </div>

      {/* Main Content - Responsive Layout */}
      <main className="p-4 lg:p-8 space-y-6 relative z-0 max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Sidebar - Filters (Desktop) */}
          <div className="lg:col-span-3">
            <div className="sticky top-0 space-y-6">
              {/* Product Stats */}
              <ProductStats 
                totalProducts={products.length}
                selectedFilters={searchFilters}
                isLoading={isLoadingProducts}
              />
              
              {/* Search Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="material-icons text-purple-600">filter_list</span>
                  Filtros
                </h3>
                <GameifiedSearch onFiltersChange={setSearchFilters} variant="sidebar" />
              </div>

              {/* Store Info */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    ¡Contáctanos por WhatsApp!
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Todos nuestros productos están disponibles para consulta.
                    Pregunta por disponibilidad, envío y formas de pago. 💚
                  </p>
                  
                  {/* Exchange Rate Indicator */}
                  <div className="flex justify-center">
                    <ExchangeRateIndicator 
                      showDetails={true}
                      className="bg-white/50 px-3 py-1.5 rounded-lg border border-green-200/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area (Desktop) */}
          <div className="lg:col-span-9">
            {/* Store Header Banner */}
            <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-8 text-white overflow-hidden mb-6">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12"></div>
                <div className="absolute top-1/4 right-0 w-16 h-16 bg-white rounded-full translate-x-8"></div>
                <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-white rounded-full translate-y-6"></div>
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full -translate-x-4 -translate-y-4"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <span className="text-3xl">🛍️</span>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold text-white">
                          Idol World Store
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-purple-100 text-sm font-medium">
                            Productos K-pop disponibles
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Counter */}
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg"></div>
                    <div className="relative bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
                      <div className="text-4xl font-bold bg-gradient-to-b from-white to-purple-100 bg-clip-text text-transparent text-center">
                        {products_transformed.length}
                      </div>
                      <div className="text-purple-100 text-sm text-center">
                        productos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact WhatsApp Button */}
                <div className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 
                  text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 ease-out 
                  transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-white/20
                  focus:outline-none focus:ring-2 focus:ring-white/50 text-center">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <span className="text-2xl">💬</span>
                    <span className="text-xl font-bold">¡Contáctanos por WhatsApp!</span>
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    Haz clic en cualquier producto para consultar disponibilidad
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid (Desktop) */}
            {isLoading ? (
              <LikesLoadingSkeleton />
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
                {/* Productos Exactos */}
                {exactProducts_transformed.length > 0 && (
                  <>
                    {searchFilters.tags && searchFilters.tags.length > 0 && (
                      <div className="xl:col-span-2 mb-6">
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-purple-800">
                                Resultados exactos ({exactCount})
                              </h3>
                              <p className="text-sm text-purple-600">
                                {searchFilters.tags.join(' + ')}
                                {searchFilters.category && searchFilters.category !== 'ALL' && ` + ${searchFilters.category}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {renderProductGrid(exactProducts_transformed)}
                  </>
                )}

                {/* Productos Relacionados */}
                {relatedProducts_transformed.length > 0 && (
                  <>
                    <div className="xl:col-span-2 mb-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">~</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-blue-800">
                              Productos relacionados ({relatedCount})
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    {renderProductGrid(relatedProducts_transformed)}
                  </>
                )}

                {/* Si no hay filtros, mostrar todos los productos sin secciones */}
                {!searchFilters.tags && !searchFilters.category && 
                  renderProductGrid(products_transformed)}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Product Stats */}
          <ProductStats 
            totalProducts={products.length}
            selectedFilters={searchFilters}
            isLoading={isLoadingProducts}
          />

          {/* Store Header Banner */}
          <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-6 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12"></div>
              <div className="absolute top-1/4 right-0 w-16 h-16 bg-white rounded-full translate-x-8"></div>
              <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-white rounded-full translate-y-6"></div>
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full -translate-x-4 -translate-y-4"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                {/* Left Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <span className="text-xl">🛍️</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md leading-snug line-clamp-2">
                      Idol World Store
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-100 text-xs font-medium">
                      Productos K-pop disponibles
                    </span>
                  </div>
                </div>

                {/* Right Counter */}
                <div className="relative shrink-0 self-center">
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20">
                    <div className="text-2xl font-bold bg-gradient-to-b from-white to-purple-100 bg-clip-text text-transparent text-center">
                      {products_transformed.length}
                    </div>
                    <div className="text-purple-100 text-xs text-center">
                      productos
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact WhatsApp Button */}
              <div className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 
                text-white font-bold py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 ease-out 
                transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-white/20
                focus:outline-none focus:ring-2 focus:ring-white/50 text-center">
                <div className="mb-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-lg sm:text-xl">💬</span>
                    <span className="text-base sm:text-lg font-bold">¡Contáctanos por WhatsApp!</span>
                    <span className="text-lg sm:text-xl">📱</span>
                  </div>
                </div>
                <p className="text-purple-100 text-xs sm:text-sm leading-relaxed px-2">
                  Haz clic en cualquier producto para consultar disponibilidad
                </p>
              </div>
            </div>
          </div>

          {/* Products List (Mobile) */}
          {isLoading ? (
            <LikesLoadingSkeleton />
          ) : (
            <div>
              {/* Productos Exactos */}
              {exactProducts_transformed.length > 0 && (
                <div>
                  {searchFilters.tags && searchFilters.tags.length > 0 && (
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-purple-800">
                              Resultados exactos ({exactCount})
                            </h3>
                            <p className="text-sm text-purple-600">
                              {searchFilters.tags.join(' + ')}
                              {searchFilters.category && searchFilters.category !== 'ALL' && ` + ${searchFilters.category}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {renderProductList(exactProducts_transformed, "exact")}
                </div>
              )}

              {/* Productos Relacionados */}
              {relatedProducts_transformed.length > 0 && (
                <div>
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">~</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">
                            Productos relacionados ({relatedCount})
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  {renderProductList(relatedProducts_transformed, "related")}
                </div>
              )}

              {/* Si no hay filtros, mostrar todos los productos sin secciones */}
              {!searchFilters.tags && !searchFilters.category && 
                renderProductList(products_transformed, "all")}
            </div>
          )}

          {/* Store Info Footer (Mobile) */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ¡Contáctanos por WhatsApp!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Todos nuestros productos están disponibles para consulta.
                Pregunta por disponibilidad, envío y formas de pago. 💚
              </p>
              
              {/* Exchange Rate Indicator */}
              <div className="flex justify-center">
                <ExchangeRateIndicator 
                  showDetails={true}
                  className="bg-white/50 px-3 py-1.5 rounded-lg border border-green-200/30"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {modalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeModal}
          data-modal="true"
        >
          <div className="relative max-w-4xl max-h-screen m-4 animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all shadow-lg hover:scale-110"
            >
              <span className="material-icons text-xl">close</span>
            </button>

            {/* Navigation Buttons (Desktop) */}
            {modalData.images.length > 1 && (
              <>
                {/* Previous Button */}
                {modalData.currentIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateModal(-1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-12 h-12 hidden md:flex items-center justify-center transition-all shadow-lg hover:scale-110"
                  >
                    <span className="material-icons text-2xl">chevron_left</span>
                  </button>
                )}

                {/* Next Button */}
                {modalData.currentIndex < modalData.images.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateModal(1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-12 h-12 hidden md:flex items-center justify-center transition-all shadow-lg hover:scale-110"
                  >
                    <span className="material-icons text-2xl">chevron_right</span>
                  </button>
                )}
              </>
            )}

            {/* Image Container with Touch Support */}
            <div 
              className="relative touch-none select-none"
              onTouchStart={(e) => {
                if (modalData.images.length <= 1) return;
                const touch = e.touches[0];
                const startX = touch.clientX;
                
                const handleTouchMove = (moveE: TouchEvent) => {
                  moveE.preventDefault();
                };
                
                const handleTouchEnd = (endE: TouchEvent) => {
                  const endTouch = endE.changedTouches[0];
                  const deltaX = endTouch.clientX - startX;
                  const threshold = 50;
                  
                  if (Math.abs(deltaX) > threshold) {
                    if (deltaX > 0) {
                      // Swipe right - go to previous
                      navigateModal(-1);
                    } else {
                      // Swipe left - go to next
                      navigateModal(1);
                    }
                  }
                  
                  document.removeEventListener('touchmove', handleTouchMove);
                  document.removeEventListener('touchend', handleTouchEnd);
                };
                
                document.addEventListener('touchmove', handleTouchMove, { passive: false });
                document.addEventListener('touchend', handleTouchEnd);
              }}
            >
              <Image
                src={modalData.images[modalData.currentIndex]}
                alt={`${modalData.productTitle} - Imagen ${modalData.currentIndex + 1}`}
                className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
                width={1200}
                height={800}
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image Counter */}
              {modalData.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {modalData.currentIndex + 1} / {modalData.images.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gamified Search Fixed - Solo mobile */}
      {showSearchFixed && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg gamified-search-fixed animate-in slide-in-from-top-4 duration-300">
          <div className="max-w-4xl mx-auto p-4">
            {/* Botón de cerrar */}
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleCloseFixed}
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 rounded-full shadow-sm"
              >
                <span className="material-icons text-xl">close</span>
              </Button>
            </div>
            
            {/* Componente de búsqueda con diseño original */}
            <GameifiedSearch onFiltersChange={setSearchFilters} />
          </div>
        </div>
      )}
    </div>
  );
}
