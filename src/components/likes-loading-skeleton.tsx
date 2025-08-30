"use client"

export function LikesLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative bg-gray-200 h-60">
            <div className="absolute top-3 right-3">
              <div className="bg-gray-300 rounded-full px-3 py-1.5 w-16 h-8"></div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="p-5 space-y-4">
            <div className="w-20 h-6 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
            </div>
            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            
            {/* Price and like section */}
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="w-24 h-5 bg-gray-200 rounded"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
