import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const firstTd = style({
  position: 'sticky',
  top: 0,
  left: 0,
  background: '#808080',
  width: 100,
})

// MEMO: scrollできるためblock要素としている
export const tbody = style({
  display: 'block',
  overflow: 'scroll',
  height: 'calc(100vh - 250px)',
})

export const Tr = style({
  display: 'flex',
  selectors: {
    '&:hover': {
      background: '#f2f2f2',
    },
  },
})

export const Td = style({
  margin: 8,
})

export const Tb = style({
  overflowX: 'scroll',
  width: 'calc(100vw - 100px)',
  display: 'block',
})

export const ChildTbWrapper = style({
  minHeight: 100,
})

export const ChildTb = style({
  background: '#e6e6e6',
})
