'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shuffle, TrendingUp, Clock } from 'lucide-react';

interface SuggestionCardProps {
  onSuggestionSelect: (filters: {
    group?: string;
    member?: string; 
    category?: string;
    tags?: string[];
  }) => void;
}

export default function GameifiedSuggestions({ onSuggestionSelect }: SuggestionCardProps) {
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  const suggestions = [
    {
      title: "🔥 Lo Más Popular",
      description: "Productos con más likes de la comunidad",
      icon: <TrendingUp className="h-5 w-5" />,
      filters: { order_by: 'likes', min_likes: 1 },
      emoji: "📈",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "✨ Recién Llegados",
      description: "Los productos más nuevos en la tienda",
      icon: <Clock className="h-5 w-5" />,
      filters: { order_by: 'created_at' },
      emoji: "🆕",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "💿 Solo Albums",
      description: "Descubre albums de miembros solistas",
      icon: <Shuffle className="h-5 w-5" />,
      filters: { tags: ['Solo'] },
      emoji: "🎤",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "🎵 TWICE Collection",
      description: "Todo el contenido disponible de TWICE",
      icon: <Shuffle className="h-5 w-5" />,
      filters: { tags: ['TWICE'] },
      emoji: "💕",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "⚡ Stray Kids Zone",
      description: "Productos de Stray Kids para STAYs",
      icon: <Shuffle className="h-5 w-5" />,
      filters: { tags: ['STRAY KIDS'] },
      emoji: "🐺",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "🌟 Light Sticks",
      description: "Lightsticks oficiales para conciertos",
      icon: <Shuffle className="h-5 w-5" />,
      filters: { category: 'Light Sticks' },
      emoji: "🔦",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "📀 Vinyl Records",
      description: "Vinilos especiales y ediciones limitadas",
      icon: <Shuffle className="h-5 w-5" />,
      filters: { category: 'Vinyl' },
      emoji: "💿",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "💰 Mejores Precios",
      description: "Productos ordenados por precio más bajo",
      icon: <Shuffle className="h-5 w-5" />,
      filters: { order_by: 'price_usd' },
      emoji: "💸",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  // Rotar sugerencias cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [suggestions.length]);

  const currentSug = suggestions[currentSuggestion];

  return (
    <Card className="mb-6 overflow-hidden border-0 shadow-lg">
      <div className={`bg-gradient-to-r ${currentSug.color} p-1`}>
        <Card className="bg-white border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{currentSug.emoji}</div>
                <div>
                  <CardTitle className="text-lg">{currentSug.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{currentSug.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-3 py-1 min-w-fit whitespace-nowrap">
                  {currentSuggestion + 1} de {suggestions.length}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex gap-2">
              <Button
                onClick={() => onSuggestionSelect(currentSug.filters)}
                className="flex-1"
                size="sm"
              >
                {currentSug.icon}
                <span className="ml-2">Explorar</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSuggestion((prev) => (prev + 1) % suggestions.length)}
              >
                <Shuffle className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Indicadores de progreso */}
            <div className="flex gap-1 mt-3 justify-center">
              {suggestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSuggestion(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSuggestion 
                      ? 'bg-purple-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
}
