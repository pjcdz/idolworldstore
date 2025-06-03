"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  const [pressedItem, setPressedItem] = useState<string | null>(null);

  const navItems = [
    {
      id: "gos",
      icon: "groups",
      label: "GOs",
      href: "/",
      emoji: "🎯",
    },
    {
      id: "store",
      icon: "storefront",
      label: "STORE",
      href: "/store",
      emoji: "🛍️",
    },
    {
      id: "wishes",
      icon: "card_giftcard",
      label: "WISHes",
      href: "/wishes",
      emoji: "✨",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <style jsx global>{`
        .nav-item.active .material-icons,
        .nav-item.active span {
          color: #7f23fd;
        }

        .nav-item .material-icons {
          font-size: 28px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item span {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item:hover .material-icons {
          transform: scale(1.1) translateY(-2px);
        }

        .nav-item.active .material-icons {
          transform: scale(1.15);
          filter: drop-shadow(0 0 8px rgba(127, 35, 253, 0.6));
        }

        .nav-item.pressed {
          transform: scale(0.95);
        }

        .nav-celebration {
          animation: celebrate 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes celebrate {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
          100% {
            transform: scale(1);
          }
        }

        .nav-ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(127, 35, 253, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>

      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-gray-200/50 flex justify-around items-center z-50 shadow-lg">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-item ${active ? "active" : ""} ${
                pressedItem === item.id ? "pressed" : ""
              } 
                flex flex-col items-center justify-center text-gray-500 hover:text-purple-500 
                w-1/3 py-2.5 transition-all duration-300 ease-out transform 
                focus:outline-none focus:bg-gray-100/50 rounded-lg relative overflow-hidden
                active:scale-95`}
              onTouchStart={() => setPressedItem(item.id)}
              onTouchEnd={() => {
                setPressedItem(null);
                // Add celebration effect for active items
                if (active) {
                  const element = document.querySelector(
                    `[data-nav="${item.id}"]`
                  );
                  element?.classList.add("nav-celebration");
                  setTimeout(
                    () => element?.classList.remove("nav-celebration"),
                    600
                  );
                }
              }}
              onMouseDown={() => setPressedItem(item.id)}
              onMouseUp={() => setPressedItem(null)}
              onMouseLeave={() => setPressedItem(null)}
              data-nav={item.id}
            >
              <div className="relative">
                <span className="material-icons">{item.icon}</span>
                {active && (
                  <div className="absolute -top-1 -right-1 text-xs">
                    {item.emoji}
                  </div>
                )}
              </div>
              <span className="text-xs mt-0.5 font-medium tracking-wide">
                {item.label}
              </span>

              {/* Subtle glow effect for active item */}
              {active && (
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-lg pointer-events-none" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default BottomNav;
