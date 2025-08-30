"use client"

interface MobileOnlyNoticeProps {
  isVisible: boolean
  onClose?: () => void
}

export function MobileOnlyNotice({ isVisible, onClose }: MobileOnlyNoticeProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 mx-4 max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full translate-y-8 -translate-x-8 opacity-50"></div>
        
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl text-white">📱</span>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Solo Mobile
          </h2>
          
          {/* Subtitle */}
          <div className="text-lg text-purple-600 font-semibold mb-4">
            ¡Por el momento! 🚧
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Este sitio web está optimizado para dispositivos mobile. 
            <br />
            <span className="font-semibold text-gray-800">
              ¡Abre desde tu celular para la mejor experiencia! 📲
            </span>
          </p>
          
          {/* Features List */}
          <div className="text-left bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-500">✨</span>
                <span>Experiencia táctil optimizada</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500">💜</span>
                <span>Navegación intuitiva</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">🌟</span>
                <span>Diseño responsivo mobile</span>
              </div>
            </div>
          </div>
          
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 ease-out 
                transform hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              Continuar de todas formas
              <span className="ml-2">→</span>
            </button>
          )}
        
        </div>
      </div>
    </div>
  )
}
