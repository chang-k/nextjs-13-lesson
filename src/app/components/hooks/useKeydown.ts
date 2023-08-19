import { useEffect } from 'react'

export const useKeydown = (
  isOpen: boolean,
  // NOTE: Keyboardの型定義は特にないから定数しかなさそう
  key: string,
  callback: () => void
) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === key) {
        callback()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, key, callback])
}
