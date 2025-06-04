import { Button } from "@/components/ui/button";

interface HeaderProps {
  // Left side - first icon (page-specific)
  leftIcon: string;
  leftIconAction?: () => void;

  // Second icon (usually filters or similar)
  secondIcon: string;
  secondIconAction?: () => void;

  // Right side - search/action icon
  rightIcon: string;
  rightIconAction?: () => void;

  // User icon is always present, but action can be customized
  userIconAction?: () => void;
}

export function Header({
  leftIcon,
  leftIconAction,
  secondIcon,
  secondIconAction,
  rightIcon,
  rightIconAction,
  userIconAction,
}: HeaderProps) {
  return (
    <header className="p-4 flex items-center justify-between sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      {/* Left side icons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-gray-800 hover:text-purple-600"
          onClick={leftIconAction}
        >
          <span className="material-icons text-2xl">{leftIcon}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-purple-600"
          onClick={secondIconAction}
        >
          <span className="material-icons text-2xl">{secondIcon}</span>
        </Button>
      </div>

      {/* Center logo - fixed position */}
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

      {/* Right side icons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-purple-600"
          onClick={rightIconAction}
        >
          <span className="material-icons text-2xl">{rightIcon}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-purple-600"
          onClick={userIconAction}
        >
          <span className="material-icons text-2xl">person</span>
        </Button>
      </div>
    </header>
  );
}
