"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";

interface Wish {
  id: string;
  title: string;
  requester: string;
  images: string[];
  likes: number;
  category: string;
  isLiked: boolean;
  priceUSD: number;
  priceARS: number;
  description?: string;
  isHot?: boolean;
  isRecent?: boolean;
}

const mockWishes: Wish[] = [
  {
    id: "1",
    title: "CHAEYOUNG - LIL FANTASY Vol.1 [Canvas Ver.]",
    requester: "OnceCollector",
    images: [
      "https://m.media-amazon.com/images/I/51XKuit1M+L._AC_SL1000_.jpg",
      "https://m.media-amazon.com/images/I/61avyfCFixL._AC_SL1440_.jpg"
    ],
    likes: 289,
    category: "Albums",
    isLiked: true,
    priceUSD: 60,
    priceARS: 80561,
    description: "1st Mini Album de Chaeyoung (Canvas Version). Edición coleccionable para fans de TWICE.",
  },
  {
    id: "2",
    title: "CHAEYOUNG - LIL FANTASY Vol.1 [Standard Ver. - Murmur]",
    requester: "ChaeWish",
    images: [
      "https://m.media-amazon.com/images/I/31k7IBkiKVL._AC_SL1000_.jpg",
      "https://m.media-amazon.com/images/I/51DpvD5qqDL._AC_SL1000_.jpg"
    ],
    likes: 245,
    category: "Albums",
    isLiked: false,
    priceUSD: 70,
    priceARS: 93988,
    description: "TWICE Chaeyoung 1st solo album, versión estándar Murmur. Incluye photobook y contenido exclusivo.",
  },
  {
    id: "3",
    title: "CHAEYOUNG - LIL FANTASY Vol.1 [Sparkle POB JYP]",
    requester: "POBHunter",
    images: [
      "https://m.media-amazon.com/images/I/31BNX6OJNHL._AC_.jpg",
      "https://m.media-amazon.com/images/I/5144VbP7VhL._AC_SL1024_.jpg"
    ],
    likes: 198,
    category: "Albums",
    isLiked: true,
    priceUSD: 44,
    priceARS: 59078,
    description: "[EXCLUSIVE POB] Sparkle Version con CD + Pre-Order Gift oficial de JYP Fans Shop.",
  },
  {
    id: "4",
    title: "CHAEYOUNG - LIL FANTASY Vol.1 [Sparkle Ver. WithMuu]",
    requester: "WithMuuFan",
    images: [
      "https://m.media-amazon.com/images/I/61ThxtMcVYL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71nMZ7qil3L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71jwOsx6yvL._AC_SL1500_.jpg"
    ],
    likes: 322,
    category: "Albums",
    isLiked: false,
    priceUSD: 50,
    priceARS: 67134,
    description: "[WITHMUU POB Exclusive] Digipack Sparkle Version. Edición exclusiva y sellada.",
  },
  {
    id: "5",
    title: "CHAEYOUNG - LIL FANTASY Vol.1 [Avocado Pit Vinyl]",
    requester: "VinylOnce",
    images: [
      "https://m.media-amazon.com/images/I/516wNdo-8hL._SL1500_.jpg"
    ],
    likes: 156,
    category: "Albums",
    isLiked: true,
    priceUSD: 60,
    priceARS: 80561,
    description: "Vinilo edición especial Avocado Pit del primer mini álbum de Chaeyoung.",
  },
];

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(
    mockWishes.sort((a, b) => b.likes - a.likes)
  );
  const [celebratingItems, setCelebratingItems] = useState<Set<string>>(
    new Set()
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});
  const [modalImage, setModalImage] = useState<string | null>(null);

  const nextImage = (wishId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [wishId]: ((prev[wishId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (wishId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [wishId]: ((prev[wishId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalImage && event.key === 'Escape') {
        closeModal();
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalImage]);

  const toggleLike = (id: string) => {
    setWishes((prev) =>
      prev.map((wish) => {
        if (wish.id === id) {
          const newLikes = wish.isLiked ? wish.likes - 1 : wish.likes + 1;
          return { ...wish, isLiked: !wish.isLiked, likes: newLikes };
        }
        return wish;
      })
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

    // Re-sort by likes after a brief delay
    setTimeout(() => {
      setWishes((prev) => [...prev].sort((a, b) => b.likes - a.likes));
    }, 100);
  };

  const createWish = () => {
    // Add celebration and feedback for the button
    const button = document.querySelector(`[data-create-wish]`);
    button?.classList.add("create-celebrate");
    setTimeout(() => button?.classList.remove("create-celebrate"), 800);
  };

  return (
    <>
      <style jsx global>{`
        /* Carousel and Modal Styles */
        .carousel-nav {
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .carousel-nav:hover {
          transform: scale(1.1);
        }

        .image-modal {
          animation: modalFadeIn 0.3s ease-out;
        }

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

        .image-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .image-hover:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        /* Price styling */
        .price-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px;
        }

        .heart-icon {
          color: #a1a1aa;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: visible;
        }

        .heart-icon.liked {
          color: #7f23fd;
          filter: drop-shadow(0 0 8px rgba(127, 35, 253, 0.6));
        }

        .heart-icon:active {
          transform: scale(1.3);
        }

        /* TikTok/Instagram style heart animation */
        .heart-celebrate {
          animation: heart-explosion 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes heart-explosion {
          0% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.6) rotate(-5deg);
          }
          30% {
            transform: scale(1.3) rotate(3deg);
          }
          45% {
            transform: scale(1.5) rotate(-2deg);
          }
          60% {
            transform: scale(1.2) rotate(1deg);
          }
          75% {
            transform: scale(1.35) rotate(-1deg);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Ripple effect like Instagram */
        .heart-icon::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(
            circle,
            rgba(127, 35, 253, 0.3) 0%,
            transparent 70%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }

        .heart-celebrate::before {
          animation: ripple-effect 0.8s ease-out;
        }

        @keyframes ripple-effect {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          50% {
            width: 80px;
            height: 80px;
            opacity: 0.4;
          }
          100% {
            width: 120px;
            height: 120px;
            opacity: 0;
          }
        }

        .hot-badge {
          animation: pulse-hot 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        @keyframes pulse-hot {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 7px rgba(239, 68, 68, 0);
          }
        }

        .recent-badge {
          animation: shimmer 2s infinite;
          background: linear-gradient(90deg, #10b981, #34d399, #10b981);
          background-size: 200% 100%;
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

        .create-celebrate {
          animation: create-success 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes create-success {
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

        /* Enhanced floating hearts with different sizes and colors */
        .floating-hearts {
          position: absolute;
          pointer-events: none;
          z-index: 10;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .floating-heart {
          position: absolute;
          animation: float-up-enhanced 2s ease-out forwards;
          font-size: 16px;
          font-weight: bold;
        }

        .floating-heart:nth-child(1) {
          font-size: 20px;
          animation-duration: 1.8s;
        }
        .floating-heart:nth-child(2) {
          font-size: 24px;
          animation-duration: 2.2s;
        }
        .floating-heart:nth-child(3) {
          font-size: 18px;
          animation-duration: 2s;
        }
        .floating-heart:nth-child(4) {
          font-size: 22px;
          animation-duration: 1.9s;
        }
        .floating-heart:nth-child(5) {
          font-size: 16px;
          animation-duration: 2.1s;
        }

        @keyframes float-up-enhanced {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.5) rotate(0deg);
          }
          15% {
            opacity: 1;
            transform: translateY(-20px) scale(1.2) rotate(15deg);
          }
          30% {
            opacity: 0.9;
            transform: translateY(-40px) scale(1) rotate(-10deg);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-70px) scale(1.1) rotate(20deg);
          }
          70% {
            opacity: 0.4;
            transform: translateY(-100px) scale(0.9) rotate(-15deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-140px) scale(0.3) rotate(25deg);
          }
        }

        /* Sparkle effect */
        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #7f23fd;
          border-radius: 50%;
          animation: sparkle-float 1.5s ease-out forwards;
          pointer-events: none;
        }

        @keyframes sparkle-float {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0);
          }
        }

        /* Pulse rings effect */
        .pulse-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          pointer-events: none;
          z-index: -1;
        }

        .pulse-ring {
          position: absolute;
          border: 2px solid rgba(127, 35, 253, 0.4);
          border-radius: 50%;
          animation: pulse-ring 1.5s ease-out forwards;
        }

        .pulse-ring:nth-child(1) {
          animation-delay: 0s;
        }
        .pulse-ring:nth-child(2) {
          animation-delay: 0.3s;
        }
        .pulse-ring:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes pulse-ring {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          100% {
            width: 80px;
            height: 80px;
            opacity: 0;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .likes-counter {
          animation: pulse-likes 2s infinite;
        }

        @keyframes pulse-likes {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header
          leftIcon="card_giftcard"
          secondIcon="filter_list"
          rightIcon="search"
          secondIconAction={() => console.log("Filter clicked")}
          rightIconAction={() => console.log("Search clicked")}
          userIconAction={() => console.log("Profile clicked")}
        />

        {/* Main Content */}
        <main className="p-4 space-y-6 relative z-0">
          {/* Wishes Header Banner */}
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
                      <span className="text-xl">✨</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white truncate">
                      WISHes
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-100 text-xs font-medium">
                      Deseos de la comunidad
                    </span>
                  </div>
                </div>

                {/* Right Counter */}
                <div className="relative shrink-0 self-center">
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20">
                    <div className="text-2xl font-bold bg-gradient-to-b from-white to-purple-100 bg-clip-text text-transparent text-center">
                      {wishes.reduce((sum, wish) => sum + wish.likes, 0)}
                    </div>
                    <div className="text-purple-100 text-xs text-center">
                      likes totales
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Wish Button */}
              <Button
                onClick={createWish}
                data-create-wish
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 
                  text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 ease-out 
                  transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-white/20
                  focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span className="mr-3 text-xl">🌟</span>
                <span className="text-lg">¿Qué artículo deseas?</span>
                <span className="ml-3 text-xl">💫</span>
              </Button>
            </div>
          </div>

          {/* Wishes List */}
          {wishes.map((wish) => {
            const isCelebrating = celebratingItems.has(wish.id);

            return (
              <div
                key={wish.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-out card-hover transform border border-gray-200/50 ${
                  isCelebrating ? "scale-105" : ""
                }`}
              >
                {/* Image Carousel Section */}
                <div className="relative bg-white group">
                  <div className="relative overflow-hidden">
                    <img
                      alt={wish.title}
                      className="w-full h-60 object-contain bg-white cursor-pointer transition-transform hover:scale-105"
                      src={wish.images[currentImageIndex[wish.id] || 0]}
                      onClick={() => openModal(wish.images[currentImageIndex[wish.id] || 0])}
                    />
                    
                    {/* Carousel Navigation */}
                    {wish.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(wish.id, wish.images.length)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all carousel-nav shadow-lg"
                        >
                          <span className="material-icons text-lg">chevron_left</span>
                        </button>
                        <button
                          onClick={() => nextImage(wish.id, wish.images.length)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all carousel-nav shadow-lg"
                        >
                          <span className="material-icons text-lg">chevron_right</span>
                        </button>
                        
                        {/* Image Indicators */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {wish.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(prev => ({ ...prev, [wish.id]: index }))}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                (currentImageIndex[wish.id] || 0) === index
                                  ? 'bg-white'
                                  : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Likes Counter - Top Right */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                      <span className="material-icons text-pink-400 text-sm">
                        favorite
                      </span>
                      <span className="text-white text-sm font-semibold likes-counter">
                        {wish.likes}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="mb-2">
                    <Badge
                      variant="outline"
                      className="text-xs text-gray-600 mb-2"
                    >
                      {wish.category}
                    </Badge>
                  </div>

                  <h2
                    className="text-lg font-semibold text-gray-900 mb-2 leading-tight"
                    title={wish.title}
                  >
                    {wish.title}
                  </h2>

                  {wish.description && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {wish.description}
                    </p>
                  )}

                  {/* Price and Time Section */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-900">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-purple-600">
                          ${wish.priceUSD} USD
                        </span>
                        <span className="text-sm text-gray-600">
                          ≈ ${wish.priceARS.toLocaleString()} ARS
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleLike(wish.id)}
                      className={`heart-icon ${wish.isLiked ? "liked" : ""} ${
                        isCelebrating ? "heart-celebrate" : ""
                      } 
                        p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ease-out transform 
                        hover:scale-110 active:scale-125 relative`}
                      aria-label={
                        wish.isLiked ? "Quitar like" : "Dar like a este deseo"
                      }
                    >
                      <span className="material-icons text-2xl align-middle">
                        {wish.isLiked ? "favorite" : "favorite_border"}
                      </span>

                      {/* Floating hearts effect */}
                      {isCelebrating && wish.isLiked && (
                        <div className="floating-hearts">
                          {[...Array(5)].map((_, i) => (
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

                  {/* Support Button */}
                  <Button
                    onClick={() => toggleLike(wish.id)}
                    className={`w-full ${
                      wish.isLiked
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                        : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    } 
                      text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 ease-out 
                      transform hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-purple-600/40 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
                  >
                    {wish.isLiked ? (
                      <>
                        <span className="mr-2">💖</span>
                        ¡Ya apoyas este deseo!
                        <span className="ml-2">✨</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🙌</span>
                        Apoyar este deseo
                        <span className="ml-2">🌟</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Community Info Footer */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
            <div className="text-center">
              <div className="text-2xl mb-2">🌟</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ¡Más deseos, más posibilidades!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Los deseos con más likes tienen más posibilidades de convertirse
                en Group Orders. ¡Apoya los deseos que más te gusten! 💜
              </p>
            </div>
          </div>
        </main>

        {/* Image Modal */}
        {modalImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm image-modal"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl max-h-screen m-4">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all carousel-nav shadow-lg"
              >
                <span className="material-icons text-xl">close</span>
              </button>
              <img
                src={modalImage}
                alt="Imagen ampliada"
                className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
