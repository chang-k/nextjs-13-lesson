import { style, keyframes } from '@vanilla-extract/css'

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const spinnerStyle = style({
  animation: `${rotate} 2s linear infinite`,
  borderTop: '4px solid transparent',
  borderRight: '4px solid currentColor',
  borderBottom: '4px solid currentColor',
  borderLeft: '4px solid currentColor',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
})
