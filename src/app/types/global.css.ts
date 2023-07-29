import { keyframes } from '@vanilla-extract/css'

export const spinnerKeyframes = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
