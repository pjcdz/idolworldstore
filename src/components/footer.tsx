import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-sm ${className || ""}`}>
      {/* Main Footer Content */}
      <div className="p-6 space-y-6">
        {/* Logo and Brand Section */}
        <div className="text-center">
          <div className="relative inline-block">
            {/* Logo background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-sm opacity-30 scale-110"></div>
            
            {/* Main logo */}
            <span className="relative font-mono text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 bg-clip-text text-transparent tracking-wider drop-shadow-sm">
              I<span className="text-4xl">W</span>S
            </span>
            
            {/* Subtle underline accent */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 opacity-60"></div>
          </div>
          
          <p className="text-gray-600 text-sm mt-3 font-medium">
            Tu tienda K-pop de confianza ✨
          </p>
        </div>

        <Separator className="bg-gray-200" />

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">Compras</h4>
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                Group Orders
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                Store
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                Wishlist
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">Soporte</h4>
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                Ayuda
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                Envíos
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                Contacto
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">Síguenos</h4>
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                Instagram
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                Twitter
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-600 hover:text-purple-600">
                TikTok
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Contact Info */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span className="material-icons text-sm text-purple-600">email</span>
              <span>support@idolworld.store</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-icons text-sm text-purple-600">phone</span>
              <span>+82-10-KPOP-IDOL</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-2 text-xs text-gray-600">
            <span className="material-icons text-sm text-green-500">verified</span>
            <span>Tienda verificada y segura</span>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <div className="flex justify-center items-center gap-3">
            <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-500 hover:text-purple-600 px-2">
              Términos
            </Button>
            <span className="text-gray-300">•</span>
            <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-500 hover:text-purple-600 px-2">
              Privacidad
            </Button>
            <span className="text-gray-300">•</span>
            <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-500 hover:text-purple-600 px-2">
              Cookies
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}