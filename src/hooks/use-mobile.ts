"use client"

import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(true) // Default to true to avoid hydration issues
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth <= 768
      
      setIsMobile(isMobileDevice || isSmallScreen)
      setIsLoading(false)
    }

    checkMobile()
    
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768
      const userAgent = navigator.userAgent
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { isMobile, isLoading }
}
