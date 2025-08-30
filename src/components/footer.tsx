import { Button } from "@/components/ui/button";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-sm ${
        className || ""
      }`}
    >
      {/* Main Footer Content */}
      <div className="p-6">
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
      </div>
    </footer>
  );
}
