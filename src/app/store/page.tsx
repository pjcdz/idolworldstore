"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
  isLiked: boolean;
  isFreeShipping?: boolean;
}

const mockProducts: Product[] = [
  {
    id: "1",
    title: "NewJeans 'Get Up' Album Digipack",
    brand: "ADOR",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaH4ZrWBEGk0q1kOKq5u1vWmeDZwZSK2sZc-y1b0Ckg9uWK0TlTRw_i_ubvewF9cOdrlUd2yyEMAoz4bB8yVTTKIdLCVgK1lCIDj_JSa3I4Kuf_6oEyiPs0D4j8OfEFCl99kniXbRovUsONYR_6YEkNJ77H7gxBKlwEvQxBzGSl7_6VDsJajKFybsTo4iojpOLaz6imhKL_mIxQErYsuUswibG4H1_1z5H8OQS_qupspugTD2X5TmXRxU0hqdOHZ3AijthjOj0Da-Q",
    price: 22.99,
    originalPrice: 28.99,
    stock: 15,
    category: "Albums",
    isNew: true,
    isLiked: false,
    isFreeShipping: true,
  },
  {
    id: "2",
    title: "BLACKPINK Lisa Photocard Set",
    brand: "YG Entertainment",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApYkfr6XU6UlpRZ_FaZCL0IYgtCDEbbwz73-0G7lKKdw-XC_JDd7ktC3R64bKIyvt1DpTnj0ehqhYlN4TGBcmjU5yB6WzqdNgWi_r9blz95BDfG4t3Xvoe8gqEBbhBs8yJUv9w9_bQg1xKJ6ReIIyRYn3fGxpXTmZrgTpjrysWN37wAUenDh8aIV4aVnNArW1k-vNNLoFEad9AxLHHxXkadRvUtkhEbgy8fHj3_YVWzs-6Jby8htGHtBP7FPdkvqX_IS3Svkxa4Rc7",
    price: 18.50,
    stock: 3,
    category: "Photocards",
    isPopular: true,
    isLiked: true,
  },
  {
    id: "3",
    title: "aespa 'My World' Lightstick Oficial",
    brand: "SM Entertainment",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmn11B0bR6PHc_O--Sbi-mVUepsCN0UTz2hpvFAeGKDTnwRWM2jaKDl4CNr7dVy5WQ0vNjxx56BwP3L2ox_X3dU1gkvLPe2Zz9k9JU3GgZkSHIauf1gVmPk9zVS1pfs6ztZv0eBkyOBhuD-X5i5ysu1wk1EMmhShrtDn79t2pahkFejqv8dTK9-b5h5dG5bWt7DGUEM_TF_U9fU3tOmlYmd99iZarzGyJvl81YEtoX1m6BJosTM5kVR_ZxebvyFX9X2id1odPL1_n6",
    price: 45.00,
    originalPrice: 52.00,
    stock: 8,
    category: "Lightsticks",
    isPopular: true,
    isLiked: false,
    isFreeShipping: true,
  },
  {
    id: "4",
    title: "TWICE 'Formula of Love' Poster Set",
    brand: "JYP Entertainment",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApYkfr6XU6UlpRZ_FaZCL0IYgtCDEbbwz73-0G7lKKdw-XC_JDd7ktC3R64bKIyvt1DpTnj0ehqhYlN4TGBcmjU5yB6WzqdNgWi_r9blz95BDfG4t3Xvoe8gqEBbhBs8yJUv9w9_bQg1xKJ6ReIIyRYn3fGxpXTmZrgTpjrysWN37wAUenDh8aIV4aVnNArW1k-vNNLoFEad9AxLHHxXkadRvUtkhEbgy8fHj3_YVWzs-6Jby8htGHtBP7FPdkvqX_IS3Svkxa4Rc7",
    price: 12.99,
    stock: 25,
    category: "Merchandise",
    isLiked: false,
  },
  {
    id: "5",
    title: "BTS 'Map of the Soul: 7' Vinyl Edición Limitada",
    brand: "HYBE Corporation",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaH4ZrWBEGk0q1kOKq5u1vWmeDZwZSK2sZc-y1b0Ckg9uWK0TlTRw_i_ubvewF9cOdrlUd2yyEMAoz4bB8yVTTKIdLCVgK1lCIDj_JSa3I4Kuf_6oEyiPs0D4j8OfEFCl99kniXbRovUsONYR_6YEkNJ77H7gxBKlwEvQxBzGSl7_6VDsJajKFybsTo4iojpOLaz6imhKL_mIxQErYsuUswibG4H1_1z5H8OQS_qupspugTD2X5TmXRxU0hqdOHZ3AijthjOj0Da-Q",
    price: 89.99,
    originalPrice: 99.99,
    stock: 2,
    category: "Vinyl",
    isPopular: true,
    isLiked: false,
    isFreeShipping: true,
  },
];

export default function Store() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [celebratingItems, setCelebratingItems] = useState<Set<string>>(
    new Set()
  );

  const toggleLike = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, isLiked: !product.isLiked } : product
      )
    );

    // Add celebration effect
    setCelebratingItems((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setCelebratingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 600);
  };

  const buyProduct = (id: string) => {
    // Add celebration and feedback
    const button = document.querySelector(`[data-buy="${id}"]`);
    button?.classList.add("buy-celebrate");
    setTimeout(() => button?.classList.remove("buy-celebrate"), 800);
  };

  const getStockColor = (stock: number) => {
    if (stock <= 3) return "text-red-600";
    if (stock <= 10) return "text-orange-600";
    return "text-green-600";
  };

  const getStockText = (stock: number) => {
    if (stock <= 3) return `¡Solo quedan ${stock}!`;
    if (stock <= 10) return `${stock} disponibles`;
    return `${stock} en stock`;
  };

  return (
    <>
      <style jsx global>{`
        .heart-icon {
          color: #a1a1aa;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .heart-icon.liked {
          color: #7f23fd;
          filter: drop-shadow(0 0 8px rgba(127, 35, 253, 0.6));
        }

        .heart-icon:active {
          transform: scale(1.3);
        }

        .heart-celebrate {
          animation: heart-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes heart-bounce {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.4) rotate(15deg);
          }
          100% {
            transform: scale(1);
          }
        }

        .popular-badge {
          animation: pulse-badge 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        @keyframes pulse-badge {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.5);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 7px rgba(220, 38, 38, 0);
          }
        }

        .new-badge {
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0%,
          100% {
            background-position: -200% center;
          }
          50% {
            background-position: 200% center;
          }
        }

        .buy-celebrate {
          animation: buy-success 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes buy-success {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.1);
          }
          60% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }

        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(127, 35, 253, 0.1);
        }

        .floating-hearts {
          position: absolute;
          pointer-events: none;
          z-index: 10;
        }

        .floating-heart {
          position: absolute;
          animation: float-up 1.5s ease-out forwards;
          font-size: 20px;
        }

        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.2);
          }
        }

        .stock-indicator {
          animation: pulse-stock 2s infinite;
        }

        @keyframes pulse-stock {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="p-4 flex justify-between items-center sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="material-icons text-2xl text-gray-800">
              storefront
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-purple-600"
            >
              <span className="material-icons">filter_list</span>
            </Button>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="font-mono text-2xl font-bold text-gray-900 tracking-wider">
              IWS
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-purple-600"
            >
              <span className="material-icons">search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-purple-600"
            >
              <span className="material-icons">person</span>
            </Button>
          </div>
        </header>

        {/* Cart Button - Floating */}
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 
            hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-purple-600/40 transition-all duration-300 
            transform hover:scale-110 active:scale-95 z-50"
        >
          <span className="material-icons text-2xl">shopping_cart</span>
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs 
              flex items-center justify-center transform scale-100 transition-transform 
              duration-200 hover:scale-110"
          >
            3
          </Badge>
        </Button>

        {/* Main Content */}
        <main className="p-4 space-y-6">
          {/* Store Info Banner - Enhanced & Mobile Optimized */}
          <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-6 text-white overflow-hidden">
            {/* Background Pattern - Optimized */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12"></div>
              <div className="absolute top-1/4 right-0 w-16 h-16 bg-white rounded-full translate-x-8"></div>
              <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-white rounded-full translate-y-6"></div>
            </div>
            
            {/* Content - Reorganized for Mobile */}
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                {/* Left Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <span className="text-xl">🛍️</span>
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent truncate">
                      STORE K-POP
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-100 text-xs font-medium">
                      Disponible 24/7
                    </span>
                  </div>
                </div>

                {/* Right Counter - Center Aligned */}
                <div className="relative shrink-0 self-center">
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20">
                    <div className="text-2xl font-bold bg-gradient-to-b from-white to-purple-100 bg-clip-text text-transparent text-center">
                      {products.length}
                    </div>
                    <div className="text-purple-100 text-xs text-center">
                      productos
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats - Justified */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">🚀</span>
                  <span className="text-purple-100 text-xs">Envío rápido</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">💝</span>
                  <span className="text-purple-100 text-xs">Oficial</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">🔒</span>
                  <span className="text-purple-100 text-xs">Seguro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {products.map((product) => {
            const isCelebrating = celebratingItems.has(product.id);

            return (
              <div
                key={product.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-out card-hover transform border border-gray-200/50 ${
                  isCelebrating ? "scale-105" : ""
                }`}
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    alt={product.title}
                    className="w-full h-60 object-cover"
                    src={product.image}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isPopular && (
                      <div className="popular-badge bg-red-600 text-white text-[11px] px-2.5 py-1 rounded-md font-semibold tracking-wide shadow-md">
                        🔥 POPULAR
                      </div>
                    )}
                    {product.isNew && (
                      <div className="new-badge bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[11px] px-2.5 py-1 rounded-md font-semibold tracking-wide shadow-md">
                        ✨ NUEVO
                      </div>
                    )}
                  </div>

                  {/* Free Shipping Badge */}
                  {product.isFreeShipping && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-[10px]">
                        📦 ENVÍO GRATIS
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs text-gray-600 mb-2">
                      {product.category}
                    </Badge>
                  </div>

                  <h2
                    className="text-lg font-semibold text-gray-900 mb-2 truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h2>

                  <p className="text-sm text-gray-600 mb-3">{product.brand}</p>

                  {/* Stock Indicator */}
                  <div className="mb-4">
                    <div className={`text-xs font-medium ${getStockColor(product.stock)} ${
                      product.stock <= 3 ? "stock-indicator" : ""
                    }`}>
                      {getStockText(product.stock)}
                    </div>
                  </div>

                  {/* Price and Like Section */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-900">
                      <span className="text-xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-1.5">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleLike(product.id)}
                      className={`heart-icon ${product.isLiked ? "liked" : ""} ${
                        isCelebrating ? "heart-celebrate" : ""
                      } 
                        p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ease-out transform 
                        hover:scale-110 active:scale-125 relative`}
                      aria-label={
                        product.isLiked
                          ? "Quitar de favoritos"
                          : "Agregar a favoritos"
                      }
                    >
                      <span className="material-icons text-2xl align-middle">
                        {product.isLiked ? "favorite" : "favorite_border"}
                      </span>

                      {/* Floating hearts effect */}
                      {isCelebrating && product.isLiked && (
                        <div className="floating-hearts">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="floating-heart"
                              style={{
                                left: `${-10 + i * 10}px`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            >
                              💜
                            </div>
                          ))}
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Buy Button */}
                  <Button
                    onClick={() => buyProduct(product.id)}
                    data-buy={product.id}
                    disabled={product.stock === 0}
                    className={`w-full ${
                      product.stock === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    } 
                      text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 ease-out 
                      transform hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-purple-600/40 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
                  >
                    {product.stock === 0 ? (
                      <>
                        <span className="mr-2">😔</span>
                        Agotado
                        <span className="ml-2">📭</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🛒</span>
                        Comprar Ahora
                        <span className="ml-2">💳</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
}