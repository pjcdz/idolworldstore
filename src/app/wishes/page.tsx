"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";

interface Wish {
  id: string;
  title: string;
  requester: string;
  image: string;
  likes: number;
  category: string;
  createdAt: string;
  isLiked: boolean;
  estimatedPrice?: number;
  description?: string;
  isHot?: boolean;
  isRecent?: boolean;
}

const mockWishes: Wish[] = [
  {
    id: "1",
    title: "SEVENTEEN 'God of Music' Lightstick Ver. 3",
    requester: "CaratForever",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaH4ZrWBEGk0q1kOKq5u1vWmeDZwZSK2sZc-y1b0Ckg9uWK0TlTRw_i_ubvewF9cOdrlUd2yyEMAoz4bB8yVTTKIdLCVgK1lCIDj_JSa3I4Kuf_6oEyiPs0D4j8OfEFCl99kniXbRovUsONYR_6YEkNJ77H7gxBKlwEvQxBzGSl7_6VDsJajKFybsTo4iojpOLaz6imhKL_mIxQErYsuUswibG4H1_1z5H8OQS_qupspugTD2X5TmXRxU0hqdOHZ3AijthjOj0Da-Q",
    likes: 156,
    category: "Lightsticks",
    createdAt: "Hace 2h",
    isLiked: true,
    estimatedPrice: 65.0,
    description: "¡Por favor necesitamos el nuevo lightstick de SVT! 🔥",
    isHot: true,
  },
  {
    id: "2",
    title: "IVE 'I AM' Album Photobook Edición Limitada",
    requester: "DiveCollector",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApYkfr6XU6UlpRZ_FaZCL0IYgtCDEbbwz73-0G7lKKdw-XC_JDd7ktC3R64bKIyvt1DpTnj0ehqhYlN4TGBcmjU5yB6WzqdNgWi_r9blz95BDfG4t3Xvoe8gqEBbhBs8yJUv9w9_bQg1xKJ6ReIIyRYn3fGxpXTmZrgTpjrysWN37wAUenDh8aIV4aVnNArW1k-vNNLoFEad9AxLHHxXkadRvUtkhEbgy8fHj3_YVWzs-6Jby8htGHtBP7FPdkvqX_IS3Svkxa4Rc7",
    likes: 89,
    category: "Albums",
    createdAt: "Hace 5h",
    isLiked: false,
    estimatedPrice: 45.0,
    description:
      "Album con fotos exclusivas que no encontramos en ningún lado 💕",
  },
  {
    id: "3",
    title: "(G)I-DLE Minnie Photocard Set Oficial",
    requester: "NeverbandFan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmn11B0bR6PHc_O--Sbi-mVUepsCN0UTz2hpvFAeGKDTnwRWM2jaKDl4CNr7dVy5WQ0vNjxx56BwP3L2ox_X3dU1gkvLPe2Zz9k9JU3GgZkSHIauf1gVmPk9zVS1pfs6ztZv0eBkyOBhuD-X5i5ysu1wk1EMmhShrtDn79t2pahkFejqv8dTK9-b5h5dG5bWt7DGUEM_TF_U9fU3tOmlYmd99iZarzGyJvl81YEtoX1m6BJosTM5kVR_ZxebvyFX9X2id1odPL1_n6",
    likes: 234,
    category: "Photocards",
    createdAt: "Hace 1d",
    isLiked: true,
    estimatedPrice: 28.0,
    description: "Las photocards de Minnie son imposibles de conseguir 😭",
    isHot: true,
  },
  {
    id: "4",
    title: "NewJeans Bunny Hat Oficial Merchandise",
    requester: "BunnyLover",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaH4ZrWBEGk0q1kOKq5u1vWmeDZwZSK2sZc-y1b0Ckg9uWK0TlTRw_i_ubvewF9cOdrlUd2yyEMAoz4bB8yVTTKIdLCVgK1lCIDj_JSa3I4Kuf_6oEyiPs0D4j8OfEFCl99kniXbRovUsONYR_6YEkNJ77H7gxBKlwEvQxBzGSl7_6VDsJajKFybsTo4iojpOLaz6imhKL_mIxQErYsuUswibG4H1_1z5H8OQS_qupspugTD2X5TmXRxU0hqdOHZ3AijthjOj0Da-Q",
    likes: 67,
    category: "Merchandise",
    createdAt: "Hace 3h",
    isLiked: false,
    estimatedPrice: 35.0,
    description: "El gorro de conejito más tierno que he visto ✨",
    isRecent: true,
  },
  {
    id: "5",
    title: "TWICE Nayeon Solo Album 'IM NAYEON' Vinyl",
    requester: "OnceVinyl",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApYkfr6XU6UlpRZ_FaZCL0IYgtCDEbbwz73-0G7lKKdw-XC_JDd7ktC3R64bKIyvt1DpTnj0ehqhYlN4TGBcmjU5yB6WzqdNgWi_r9blz95BDfG4t3Xvoe8gqEBbhBs8yJUv9w9_bQg1xKJ6ReIIyRYn3fGxpXTmZrgTpjrysWN37wAUenDh8aIV4aVnNArW1k-vNNLoFEad9AxLHHxXkadRvUtkhEbgy8fHj3_YVWzs-6Jby8htGHtBP7FPdkvqX_IS3Svkxa4Rc7",
    likes: 143,
    category: "Vinyl",
    createdAt: "Hace 6h",
    isLiked: false,
    estimatedPrice: 75.0,
    description: "¡Necesito este vinyl en mi colección! 🎵",
  },
];

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(
    mockWishes.sort((a, b) => b.likes - a.likes)
  );
  const [celebratingItems, setCelebratingItems] = useState<Set<string>>(
    new Set()
  );

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

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">🔥</span>
                  <span className="text-purple-100 text-xs">Tendencias</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">💖</span>
                  <span className="text-purple-100 text-xs">Comunidad</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">🎯</span>
                  <span className="text-purple-100 text-xs">Demanda</span>
                </div>
              </div>
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
                {/* Image Section */}
                <div className="relative">
                  <img
                    alt={wish.title}
                    className="w-full h-60 object-cover"
                    src={wish.image}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {wish.isHot && (
                      <div className="hot-badge bg-red-600 text-white text-[11px] px-2.5 py-1 rounded-md font-semibold tracking-wide shadow-md">
                        🔥 POPULAR
                      </div>
                    )}
                    {wish.isRecent && (
                      <div className="recent-badge text-white text-[11px] px-2.5 py-1 rounded-md font-semibold tracking-wide shadow-md">
                        ✨ RECIENTE
                      </div>
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
                    className="text-lg font-semibold text-gray-900 mb-2 truncate"
                    title={wish.title}
                  >
                    {wish.title}
                  </h2>

                  <p className="text-sm text-gray-600 mb-2">
                    Pedido por{" "}
                    <span className="font-medium">{wish.requester}</span>
                  </p>

                  {wish.description && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {wish.description}
                    </p>
                  )}

                  {/* Price and Time Section */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-900">
                      {wish.estimatedPrice && (
                        <span className="text-lg font-bold text-purple-600">
                          ~${wish.estimatedPrice.toFixed(2)}
                        </span>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        {wish.createdAt}
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
      </div>
    </>
  );
}
