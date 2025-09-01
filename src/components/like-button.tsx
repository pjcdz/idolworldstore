"use client"

interface LikeButtonProps {
  id: string
  isLiked?: boolean
  onLike: (id: string) => void
  isLoading?: boolean
  isCelebrating?: boolean
  variant?: 'heart' | 'button'
  className?: string
}

export function LikeButton({
  id,
  isLiked = false,
  onLike,
  isLoading = false,
  isCelebrating = false,
  variant = 'heart',
  className = ''
}: LikeButtonProps) {

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onLike(id)
        }}
        disabled={isLoading}
        className={`w-full ${
          isLiked
            ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        } 
          text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 ease-out 
          transform hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-purple-600/40 
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
          disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      >
        {isLoading ? (
          <>
            <span className="mr-2">⏳</span>
            Procesando...
          </>
        ) : isLiked ? (
          <>
            <span className="mr-2">💜</span>
            Ya apoyas este wish
            <span className="ml-2">✨</span>
          </>
        ) : (
          <>
            <span className="mr-2">🙌</span>
            Apoyar este wish
            <span className="ml-2">🌟</span>
          </>
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onLike(id)
      }}
      disabled={isLoading}
      className={`heart-icon ${isLiked ? "liked" : ""} ${
        isCelebrating ? "heart-celebrate" : ""
      } 
        p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ease-out transform 
        hover:scale-110 active:scale-125 relative
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      aria-label={isLiked ? "Quitar apoyo de este wish" : "Apoyar este wish"}
    >
      <span className="material-icons text-2xl align-middle">
        {isLoading ? "hourglass_empty" : isLiked ? "favorite" : "favorite_border"}
      </span>

      {/* Floating hearts effect */}
      {isCelebrating && isLiked && (
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
  )
}