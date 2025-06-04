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
        /* Mobile responsive fixes for text truncation */
        .group-orders-title {
          font-size: clamp(1.2rem, 4vw, 2rem);
          line-height: 1.2;
          word-break: break-word;
          hyphens: auto;
        }

        .benefits-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.5rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          font-size: clamp(0.65rem, 2.5vw, 0.75rem);
          line-height: 1.3;
          min-width: 0;
          text-align: center;
        }

        .benefit-text {
          flex: 1;
          word-break: break-word;
          hyphens: auto;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Responsive adjustments for very small screens */
        @media (max-width: 375px) {
          .group-orders-title {
            font-size: 1.1rem;
          }

          .benefit-item {
            font-size: 0.6rem;
            gap: 0.25rem;
          }

          .main-description {
            font-size: 0.75rem;
            line-height: 1.4;
          }

          .stats-container {
            font-size: 0.7rem;
          }

          .benefit-text {
            white-space: normal;
          }
        }

        /* Ultra-small screens (iPhone SE, etc.) */
        @media (max-width: 320px) {
          .group-orders-title {
            font-size: 1rem;
          }

          .benefit-item {
            font-size: 0.55rem;
            gap: 0.2rem;
          }
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
                    <h1 className="text-2xl font-bold text-white truncate group-orders-title">
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
                <p className="text-purple-100 text-sm leading-relaxed main-description">
                  Únete a fans como tú para hacer pedidos grupales.
                  <span className="text-white font-medium">
                    {" "}
                    ¡Juntos compramos más barato!
                  </span>
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20 benefits-container">
                <div className="flex items-center justify-center gap-1.5 benefit-item">
                  <span className="text-base">💸</span>
                  <span className="text-purple-100 text-xs benefit-text">
                    Menos costo
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1.5 benefit-item">
                  <span className="text-base">📦</span>
                  <span className="text-purple-100 text-xs benefit-text">
                    Envío grupal
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1.5 benefit-item">
                  <span className="text-base">💜</span>
                  <span className="text-purple-100 text-xs benefit-text">
                    Comunidad
                  </span>
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
