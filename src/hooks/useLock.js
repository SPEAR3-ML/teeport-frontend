import { useState, useEffect, useCallback } from 'react'

const useLock = (duration = 1000) => {
  const [locked, setLocked] = useState(true)
  const unlock = useCallback(() => {
    setLocked(false)
  }, [setLocked])

  useEffect(() => {
    if (locked) return

    const timer = setTimeout(() => {
      setLocked(true)
    }, duration)
    return () => clearTimeout(timer)
  }, [locked, duration])

  return [locked, unlock]
}

export default useLock
