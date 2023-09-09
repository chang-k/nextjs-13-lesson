import { style } from '@vanilla-extract/css'

export const firstTh = style({
  position: 'sticky',
  top: 0,
  left: 0,
  background: '#fff',
  width: 100,
})

export const Tr = style({})

export const Tb = style({
  overflowX: 'scroll',
  width: 'calc(100vw - 100px)',
  display: 'block',
})
