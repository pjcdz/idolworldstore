"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Header } from "@/components/header";

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
  description: string;
  features: string[];
  gallery: string[];
  organizer_info: {
    name: string;
    avatar: string;
    verified: boolean;
    previous_gos: number;
    success_rate: number;
  };
  shipping: {
    estimated_date: string;
    method: string;
    tracking: boolean;
  };
  requirements: string[];
  faq: { question: string; answer: string }[];
}

// Mock detailed data for the LE SSERAFIM Light Stick GO
const mockGO: GO = {
  id: "2",
  title: "LE SSERAFIM Light Stick Oficial",
  organizer: "Idol World Store",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApYkfr6XU6UlpRZ_FaZCL0IYgtCDEbbwz73-0G7lKKdw-XC_JDd7ktC3R64bKIyvt1DpTnj0ehqhYlN4TGBcmjU5yB6WzqdNgWi_r9blz95BDfG4t3Xvoe8gqEBbhBs8yJUv9w9_bQg1xKJ6ReIIyRYn3fGxpXTmZrgTpjrysWN37wAUenDh8aIV4aVnNArW1k-vNNLoFEad9AxLHHxXkadRvUtkhEbgy8fHj3_YVWzs-6Jby8htGHtBP7FPdkvqX_IS3Svkxa4Rc7",
  currentParticipants: 192,
  maxParticipants: 200,
  price: 50.0,
  originalPrice: 55.0,
  endTime: "3d 5h",
  isPopular: true,
  isLiked: true,
  description: "¡El light stick oficial de LE SSERAFIM finalmente está aquí! Este es el momento perfecto para conseguir tu light stick oficial a precio grupal. Únete a nuestro group order y ahorra mientras apoyas a nuestras chicas favoritas. Este light stick cuenta con tecnología Bluetooth para sincronizar con los conciertos y múltiples modos de iluminación.",
  features: [
    "🎵 Conectividad Bluetooth para sincronización en conciertos",
    "💡 7 modos de iluminación diferentes",
    "🔋 Batería recargable con duración de 8+ horas",
    "📱 Control mediante app oficial LE SSERAFIM",
    "✨ Materiales de alta calidad con acabado premium",
    "🎁 Incluye packaging oficial y tarjeta de autenticidad"
  ],
  gallery: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuApYkfr6XU6UlpRZ_FaZCL0IYgtCDEbbwz73-0G7lKKdw-XC_JDd7ktC3R64bKIyvt1DpTnj0ehqhYlN4TGBcmjU5yB6WzqdNgWi_r9blz95BDfG4t3Xvoe8gqEBbhBs8yJUv9w9_bQg1xKJ6ReIIyRYn3fGxpXTmZrgTpjrysWN37wAUenDh8aIV4aVnNArW1k-vNNLoFEad9AxLHHxXkadRvUtkhEbgy8fHj3_YVWzs-6Jby8htGHtBP7FPdkvqX_IS3Svkxa4Rc7",
    "https://via.placeholder.com/400x400/7f23fd/ffffff?text=Packaging",
    "https://via.placeholder.com/400x400/a855f7/ffffff?text=App+Control",
    "https://via.placeholder.com/400x400/ec4899/ffffff?text=Lighting+Modes"
  ],
  organizer_info: {
    name: "Idol World Store",
    avatar: "https://via.placeholder.com/80x80/7f23fd/ffffff?text=IWS",
    verified: true,
    previous_gos: 127,
    success_rate: 100
  },
  shipping: {
    estimated_date: "15-20 días después del cierre",
    method: "CABA: Moto en el día | Resto del país: Correo Argentino",
    tracking: true
  },
  requirements: [
    "Pago completo por MercadoPago al unirse al GO",
    "Proporcionar dirección de envío válida en Argentina",
    "Confirmar participación dentro de 24 horas",
    "Envío a cargo del participante según zona",
    "No se permiten cancelaciones después de 48 horas"
  ],
  faq: [
    {
      question: "¿Cómo funciona el envío?",
      answer: "El envío está a cargo del participante. En CABA enviamos por moto en el día, y al resto del país por Correo Argentino. Los costos varían según la zona."
    },
    {
      question: "¿Cuándo recibiré mi light stick?",
      answer: "Una vez cerrado el Group Order, procesamos los pedidos en 15-20 días. Luego coordinamos el envío según tu ubicación."
    },
    {
      question: "¿Cómo realizo el pago?",
      answer: "Todos los pagos se procesan a través de MercadoPago. Aceptamos tarjetas de crédito, débito y otros métodos disponibles en la plataforma."
    },
    {
      question: "¿Es auténtico el producto?",
      answer: "Sí, todos nuestros productos son 100% oficiales y auténticos. Incluye certificado de autenticidad oficial de HYBE/Source Music."
    },
    {
      question: "¿Qué pasa si no se completa el group order?",
      answer: "Si no alcanzamos el mínimo de participantes, se realizará reembolso completo automáticamente a través de MercadoPago."
    },
    {
      question: "¿Incluye garantía?",
      answer: "Sí, incluye garantía oficial del fabricante por 1 año contra defectos de manufactura."
    }
  ]
};

export default function GODetail({ params }: { params: { id: string } }) {
  const [go] = useState<GO>(mockGO);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(go.isLiked);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const progressPercentage = (go.currentParticipants / go.maxParticipants) * 100;

  return (
    <>
      <style jsx global>{`
        /* Fix for line-clamp utility */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced progress bar styling */
        .progress-bar {
          background: linear-gradient(90deg, #7f23fd, #a855f7);
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(127, 35, 253, 0.3);
        }

        /* Material icons font import */
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header 
          leftIcon="arrow_back"
          leftIconAction={() => window.location.href = '/'}
          secondIcon="groups"
          rightIcon={isLiked ? "favorite" : "favorite_border"}
          rightIconAction={() => setIsLiked(!isLiked)}
        />

        <main className="pb-24">
          {/* Hero Image Gallery */}
          <div className="relative bg-gradient-to-br from-orange-100 to-orange-200">
            <div className="aspect-square">
              <img
                src={go.gallery[selectedImage]}
                alt={go.title}
                className="w-full h-full object-contain p-8"
              />
            </div>
            
            {/* Popular Badge */}
            {go.isPopular && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                🔥 POPULAR
              </div>
            )}

            {/* Image Gallery Dots */}
            <div className="absolute bottom-6 left-0 right-0">
              <div className="flex gap-2 justify-center">
                {go.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      selectedImage === index 
                        ? 'bg-gray-800 shadow-lg' 
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Title and Organizer */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{go.title}</h1>
              <div className="flex items-center gap-3">
                <img
                  src={go.organizer_info.avatar}
                  alt={go.organizer_info.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">{go.organizer_info.name}</span>
                  {go.organizer_info.verified && (
                    <span className="material-icons text-blue-500 text-lg">verified</span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-1">
                    ${go.price.toFixed(2)}
                  </div>
                  {go.originalPrice && (
                    <div className="text-gray-500 line-through text-xl">
                      ${go.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Finaliza en</div>
                  <div className="text-xl font-bold text-red-600">{go.endTime}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="progress-bar h-4 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-medium">
                    {go.currentParticipants} de {go.maxParticipants} participantes
                  </span>
                  <span className="font-bold text-purple-600 text-lg">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{go.currentParticipants}</div>
                  <div className="text-sm text-gray-600 font-medium">Participantes</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{go.maxParticipants - go.currentParticipants}</div>
                  <div className="text-sm text-gray-600 font-medium">Espacios restantes</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
              <p className={`text-gray-700 leading-relaxed text-base ${showFullDescription ? '' : 'line-clamp-3'}`}>
                {go.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-purple-600 font-semibold mt-3 hover:underline text-sm"
              >
                {showFullDescription ? 'Ver menos' : 'Ver más'}
              </button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Características</h2>
              <div className="space-y-3">
                {go.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium text-sm leading-relaxed">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Organizador</h2>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={go.organizer_info.avatar}
                  alt={go.organizer_info.name}
                  className="w-16 h-16 rounded-full border-2 border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{go.organizer_info.name}</h3>
                    {go.organizer_info.verified && (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        <span className="material-icons text-sm mr-1">verified</span>
                        Verificado
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{go.organizer_info.previous_gos}</div>
                  <div className="text-sm text-gray-600 font-medium">GOs completados</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-1">{go.organizer_info.success_rate}%</div>
                  <div className="text-sm text-gray-600 font-medium">Tasa de éxito</div>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Información de Envío</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 mb-1">15-20 días después del cierre</div>
                    <div className="text-sm text-gray-600">Tiempo de procesamiento</div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 mb-2">Métodos de envío</div>
                    <div className="text-sm text-gray-700">
                      <div className="mb-1"><strong>CABA:</strong> Moto en el día</div>
                      <div><strong>Resto del país:</strong> Correo Argentino</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-gray-700 font-medium">Tracking:</span>
                  <span className="font-bold text-green-600">✓ Incluido</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requisitos</h2>
              <div className="space-y-3">
                {go.requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-purple-600 mt-1 font-bold">•</span>
                    <span className="text-gray-800 font-medium text-sm leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
              <div className="space-y-4">
                {go.faq.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="font-bold text-gray-900 mb-3 text-base">{item.question}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-gray-200 shadow-2xl">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 rounded-xl text-lg shadow-lg">
            <span className="mr-2">🎉</span>
            Unirme al Group Order - ${go.price.toFixed(2)}
            <span className="ml-2">✨</span>
          </Button>
        </div>
      </div>
    </>
  );
}