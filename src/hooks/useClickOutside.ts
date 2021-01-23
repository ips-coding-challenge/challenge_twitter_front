import { exception } from 'console'
import { useEffect } from 'react'

export const useClickOutside = (
  ref: any,
  excludeRef: any,
  callback: Function
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (excludeRef.current && !excludeRef.current.contains(event.target)) {
          callback()
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
