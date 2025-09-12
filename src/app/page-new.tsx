"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { LikesLoadingSkeleton } from "@/components/likes-loading-skeleton";
import { MobileOnlyNotice } from "@/components/mobile-only-notice";
import { ExchangeRateIndicator } from "@/components/exchange-rate-indicator";
import GameifiedSearch from "@/components/gamified-search";
import ProductStats from "@/components/product-stats";
import ProductImageCarousel from "@/components/product-image-carousel";
import { useMobile } from "@/hooks/use-mobile";
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
  
  const { isMobile, isLoading: isMobileLoading } = useMobile();
  const [showMobileNotice, setShowMobileNotice] = useState(false);
  
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Show mobile notice for non-mobile users
  useEffect(() => {
    if (!isMobileLoading && !isMobile) {
      setShowMobileNotice(true);
    }
  }, [isMobile, isMobileLoading]);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalImage && event.key === "Escape") {
        closeModal();
      }
    };

    if (modalImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalImage]);

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

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  // Función para renderizar una lista de productos
  const renderProductList = (productList: ProductWithPrices[], sectionTitle?: string) => {
    if (productList.length === 0) return null;

    return (
      <>
        {sectionTitle && sectionTitle !== 'exact' && (
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
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-out hover:transform hover:-translate-y-1.5 hover:shadow-xl border border-gray-200/50 mb-6"
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
            <div className="p-5">
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
              <div className="flex justify-between items-center mb-4">
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

              {/* WhatsApp Contact Button */}
              <WhatsAppButton 
                product={product}
                variant="button"
              />
            </div>
          </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        leftIcon="store"
        secondIcon="filter_list"
        rightIcon="search"
        secondIconAction={() => console.log("Filter clicked")}
        rightIconAction={() => console.log("Search clicked")}
        userIconAction={() => console.log("Profile clicked")}
      />

      {/* Main Content */}
      <main className="p-4 space-y-6 relative z-0">
        {/* Gamified Search Component */}
        <GameifiedSearch onFiltersChange={setSearchFilters} />

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
                  <h1 className="text-2xl font-bold text-white truncate">
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
              text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 ease-out 
              transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-white/20
              focus:outline-none focus:ring-2 focus:ring-white/50 text-center">
              <div className="mb-2">
                <span className="text-xl">💬</span>
                <span className="ml-2 text-lg">¡Contáctanos por WhatsApp!</span>
                <span className="ml-2 text-xl">📱</span>
              </div>
              <p className="text-purple-100 text-sm">
                Haz clic en cualquier producto para consultar disponibilidad
              </p>
            </div>
          </div>
        </div>

        {/* Products List */}
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

        {/* Store Info Footer */}
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
      </main>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
          style={{ animation: "modalFadeIn 0.3s ease-out" }}
        >
          <div className="relative max-w-4xl max-h-screen m-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all shadow-lg hover:scale-110"
            >
              <span className="material-icons text-xl">close</span>
            </button>
            <Image
              src={modalImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
              width={1200}
              height={800}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Mobile Only Notice */}
      <MobileOnlyNotice
        isVisible={showMobileNotice}
        onClose={() => setShowMobileNotice(false)}
      />

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
