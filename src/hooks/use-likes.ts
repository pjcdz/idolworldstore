import { useState, useEffect, useCallback, useMemo } from 'react'
import { incrementLikes, decrementLikes } from '@/lib/like-store'

export interface LikeableItem {
  id: string
  likes: number
  isLiked?: boolean
}

export function useLikes<T extends LikeableItem>(items: T[]) {
  const [itemsWithLikes, setItemsWithLikes] = useState<T[]>([])
  const [celebratingItems, setCelebratingItems] = useState<Set<string>>(new Set())
  const [loadingLikes, setLoadingLikes] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set()) // Track user's likes

  // Memoize item IDs to prevent unnecessary re-fetching
  const itemIds = useMemo(() => items.map(item => item.id), [items])

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

  // Load likes from API on mount using batch request
  useEffect(() => {
    if (items.length === 0 || initialized) {
      return
    }

    let cancelled = false
    
    const loadLikes = async () => {
      try {
        setIsLoading(true)
        
        // Use batch endpoint for better performance
        const response = await fetch(`/api/likes/batch?ids=${itemIds.join(',')}`)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        
        const likesData = await response.json()
        
        if (!cancelled) {
          setItemsWithLikes(items.map(item => ({
            ...item,
            likes: likesData[item.id] || 0,
            isLiked: userLikes.has(item.id) // Check if user liked this item
          })))
          setInitialized(true)
        }
      } catch (error) {
        console.error('Failed to load likes:', error)
        if (!cancelled) {
          // Fallback to items with 0 likes
          setItemsWithLikes(items.map(item => ({
            ...item,
            likes: 0,
            isLiked: userLikes.has(item.id)
          })))
          setInitialized(true)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadLikes()
    
    return () => {
      cancelled = true
    }
  }, [itemIds, initialized, items, userLikes])

  const toggleLike = useCallback(async (id: string) => {
    // Prevent double-clicking
    if (loadingLikes.has(id)) {
      return
    }

    const currentItem = itemsWithLikes.find(item => item.id === id)
    if (!currentItem) return

    const isCurrentlyLiked = userLikes.has(id)

    // Add to loading state
    setLoadingLikes(prev => new Set(prev).add(id))

    try {
      let newLikes: number

      if (isCurrentlyLiked) {
        // User is removing their like
        newLikes = await decrementLikes(id)
        setUserLikes(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      } else {
        // User is adding their like
        newLikes = await incrementLikes(id)
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
      
      // Update with real value from server
      setItemsWithLikes(prev =>
        prev.map(item =>
          item.id === id 
            ? { ...item, isLiked: !isCurrentlyLiked, likes: newLikes }
            : item
        )
      )

    } catch (error) {
      console.error('Error toggling like:', error)
      // Don't update state on error - keep current state
    } finally {
      // Remove from loading state
      setLoadingLikes(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }, [loadingLikes, itemsWithLikes, userLikes])

  // Sort items by likes when they change
  const sortedItems = useMemo(() => {
    return [...itemsWithLikes].sort((a, b) => b.likes - a.likes)
  }, [itemsWithLikes])

  const totalLikes = useMemo(() => {
    return itemsWithLikes.reduce((sum, item) => sum + item.likes, 0)
  }, [itemsWithLikes])

  return {
    items: sortedItems,
    celebratingItems,
    loadingLikes,
    isLoading,
    toggleLike,
    totalLikes
  }
}
