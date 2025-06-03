"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeliveryIndicator } from "@/components/delivery-indicator";

interface GO {
  id: string;
  title: string;
  organizer: string;
  image: string;
  currentParticipants: number;
  maxParticipants: number;
  price: number;
  originalPrice?: number;
  endTime: string;
  isPopular?: boolean;
  isLiked: boolean;
}

const mockGOs: GO[] = [
  {
    id: "1",
    title: "NewJeans 'Get Up' Bolso de Playa Ver. Conejito",
    organizer: "NJFanClub",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaH4ZrWBEGk0q1kOKq5u1vWmeDZwZSK2sZc-y1b0Ckg9uWK0TlTRw_i_ubvewF9cOdrlUd2yyEMAoz4bB8yVTTKIdLCVgK1lCIDj_JSa3I4Kuf_6oEyiPs0D4j8OfEFCl99kniXbRovUsONYR_6YEkNJ77H7gxBKlwEvQxBzGSl7_6VDsJajKFybsTo4iojpOLaz6imhKL_mIxQErYsuUswibG4H1_1z5H8OQS_qupspugTD2X5TmXRxU0hqdOHZ3AijthjOj0Da-Q",
    currentParticipants: 85,
    maxParticipants: 100,
    price: 25.0,
    originalPrice: 30.0,
    endTime: "7d 12h",
    isLiked: false,
  },
  {
    id: "2",
    title: "LE SSERAFIM Light Stick Oficial",
    organizer: "FearnotGOs",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApYkfr6XU6UlpRZ_FaZCL0IYgtCDEbbwz73-0G7lKKdw-XC_JDd7ktC3R64bKIyvt1DpTnj0ehqhYlN4TGBcmjU5yB6WzqdNgWi_r9blz95BDfG4t3Xvoe8gqEBbhBs8yJUv9w9_bQg1xKJ6ReIIyRYn3fGxpXTmZrgTpjrysWN37wAUenDh8aIV4aVnNArW1k-vNNLoFEad9AxLHHxXkadRvUtkhEbgy8fHj3_YVWzs-6Jby8htGHtBP7FPdkvqX_IS3Svkxa4Rc7",
    currentParticipants: 192,
    maxParticipants: 200,
    price: 50.0,
    originalPrice: 55.0,
    endTime: "3d 5h",
    isPopular: true,
    isLiked: true,
  },
  {
    id: "3",
    title: "aespa 'Armageddon' Photocards Exclusivas",
    organizer: "MYCollectibles",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmn11B0bR6PHc_O--Sbi-mVUepsCN0UTz2hpvFAeGKDTnwRWM2jaKDl4CNr7dVy5WQ0vNjxx56BwP3L2ox_X3dU1gkvLPe2Zz9k9JU3GgZkSHIauf1gVmPk9zVS1pfs6ztZv0eBkyOBhuD-X5i5ysu1wk1EMmhShrtDn79t2pahkFejqv8dTK9-b5h5dG5bWt7DGUEM_TF_U9fU3tOmlYmd99iZarzGyJvl81YEtoX1m6BJosTM5kVR_ZxebvyFX9X2id1odPL1_n6",
    currentParticipants: 45,
    maxParticipants: 150,
    price: 12.0,
    endTime: "10d 2h",
    isLiked: false,
  },
];

export default function GOs() {
  const [gos, setGos] = useState<GO[]>(mockGOs);
  const [celebratingItems, setCelebratingItems] = useState<Set<string>>(
    new Set()
  );

  const toggleLike = (id: string) => {
    setGos((prev) =>
      prev.map((go) => (go.id === id ? { ...go, isLiked: !go.isLiked } : go))
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

  const joinGO = (id: string) => {
    // Add celebration and feedback
    const button = document.querySelector(`[data-join="${id}"]`);
    button?.classList.add("join-celebrate");
    setTimeout(() => button?.classList.remove("join-celebrate"), 800);
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

        .progress-bar-fill {
          background: linear-gradient(90deg, #7f23fd, #a855f7);
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(127, 35, 253, 0.3);
        }

        .join-celebrate {
          animation: join-success 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes join-success {
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
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="p-4 flex justify-between items-center sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="material-icons text-2xl text-gray-800">
              groups
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
            <div className="relative">
              {/* Logo background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-sm opacity-30 scale-110"></div>

              {/* Main logo */}
              <span className="relative font-mono text-2xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 bg-clip-text text-transparent tracking-wider drop-shadow-sm">
                I<span className="text-3xl">W</span>S
              </span>

              {/* Subtle underline accent */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 opacity-60"></div>
            </div>
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

        {/* Main Content */}
        <main className="p-4 space-y-6 relative z-0">
          {/* Group Orders Header Banner */}
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
                      <span className="text-xl">🤝</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white truncate">
                      Group Orders
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-100 text-xs font-medium">
                      Colabora con otros fans
                    </span>
                  </div>
                </div>

                {/* Right Stats */}
                <div className="relative shrink-0 self-center">
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20">
                    <div className="text-2xl font-bold bg-gradient-to-b from-white to-purple-100 bg-clip-text text-transparent text-center">
                      {gos.reduce((sum, go) => sum + go.currentParticipants, 0)}
                    </div>
                    <div className="text-purple-100 text-xs text-center">
                      participantes
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-purple-100 text-sm leading-relaxed">
                  Únete a fans como tú para hacer pedidos grupales. 
                  <span className="text-white font-medium"> ¡Juntos compramos más barato!</span>
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">💸</span>
                  <span className="text-purple-100 text-xs">Menos costo</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">📦</span>
                  <span className="text-purple-100 text-xs">Envío grupal</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">💜</span>
                  <span className="text-purple-100 text-xs">Comunidad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Indicator - NEW */}
          <DeliveryIndicator />

          {gos.map((go) => {
            const progressPercentage =
              (go.currentParticipants / go.maxParticipants) * 100;
            const isCelebrating = celebratingItems.has(go.id);

            return (
              <div
                key={go.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-out card-hover transform border border-gray-200/50 ${
                  isCelebrating ? "scale-105" : ""
                }`}
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    alt={go.title}
                    className="w-full h-60 object-cover"
                    src={go.image}
                  />

                  {/* Popular Badge */}
                  {go.isPopular && (
                    <div className="popular-badge absolute bottom-3 left-3 bg-red-600 text-white text-[11px] px-2.5 py-1 rounded-md font-semibold tracking-wide shadow-md">
                      🔥 POPULAR
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <h2
                    className="text-lg font-semibold text-gray-900 mb-3 truncate"
                    title={go.title}
                  >
                    {go.title}
                  </h2>

                  {/* Progress Section */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                      <span>
                        Participantes: {go.currentParticipants}/
                        {go.maxParticipants}
                      </span>
                      <span className="font-medium text-gray-800">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="progress-bar-fill h-2.5 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Price and Like Section */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-900">
                      <span className="text-xl font-bold">
                        ${go.price.toFixed(2)}
                      </span>
                      {go.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-1.5">
                          ${go.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleLike(go.id)}
                      className={`heart-icon ${go.isLiked ? "liked" : ""} ${
                        isCelebrating ? "heart-celebrate" : ""
                      } 
                        p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ease-out transform 
                        hover:scale-110 active:scale-125 relative`}
                      aria-label={
                        go.isLiked
                          ? "Quitar de favoritos"
                          : "Agregar a favoritos"
                      }
                    >
                      <span className="material-icons text-2xl align-middle">
                        {go.isLiked ? "favorite" : "favorite_border"}
                      </span>

                      {/* Floating hearts effect */}
                      {isCelebrating && go.isLiked && (
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

                  {/* Join Button */}
                  <Button
                    onClick={() => joinGO(go.id)}
                    data-join={go.id}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 
                      text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 ease-out 
                      transform hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-purple-600/40 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    <span className="mr-2">🎉</span>
                    Unirme al Group Order
                    <span className="ml-2">✨</span>
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
