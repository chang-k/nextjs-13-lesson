import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const firstTh = style({
  position: 'sticky',
  top: 0,
  left: 0,
  background: '#fff',
  width: 100,
})

export const Th = recipe({
  base: {
    width: 100,
    margin: 8,
  },
  variants: {
    isHighlight: {
      true: {
        background: '#e8e8e8',
      },
      false: {
        background: '#fff',
      },
    },
  },
})

export const CalcTotal = style({
  width: '100%',
})
