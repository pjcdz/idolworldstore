import { useState, useEffect, useCallback } from 'react'

export interface LikeableItem {
  id: string
  likes: number
}

export function useLikes() {
  const [celebratingItems, setCelebratingItems] = useState<Set<string>>(new Set())
  const [loadingLikes, setLoadingLikes] = useState<Set<string>>(new Set())
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set()) // Track user's likes
  
  // Load user's likes from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('user_likes')
    if (savedLikes) {
      try {
        const likesArray = JSON.parse(savedLikes)
        setUserLikes(new Set(likesArray))
      } catch (error) {
        console.error('Error loading user likes:', error)
      }
    }
  }, [])

  // Save user's likes to localStorage
  useEffect(() => {
    localStorage.setItem('user_likes', JSON.stringify(Array.from(userLikes)))
  }, [userLikes])

  const toggleLike = useCallback(async (id: string) => {
    // Prevent double-clicking
    if (loadingLikes.has(id)) {
      return
    }

    const isCurrentlyLiked = userLikes.has(id)

    // Add to loading state
    setLoadingLikes(prev => new Set(prev).add(id))

    try {
      if (isCurrentlyLiked) {
        // User is removing their like
        setUserLikes(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      } else {
        // User is adding their like
        setUserLikes(prev => new Set(prev).add(id))
        
        // Add celebration effect only when liking
        setCelebratingItems(prev => new Set(prev).add(id))
        setTimeout(() => {
          setCelebratingItems(prev => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
          })
        }, 600)
      }

    } catch (error) {
      console.error('Error toggling like:', error)
      // Revert state on error
      if (isCurrentlyLiked) {
        setUserLikes(prev => new Set(prev).add(id))
      } else {
        setUserLikes(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }
    } finally {
      // Remove from loading state
      setLoadingLikes(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }, [loadingLikes, userLikes])

  return {
    celebratingItems,
    loadingLikes,
    toggleLike,
    userLikes
  }
}
