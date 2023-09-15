import { style } from '@vanilla-extract/css'

export const firstTh = style({
  position: 'sticky',
  top: 0,
  left: 0,
  background: '#fff',
  width: 100,
})

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
})

export const Th = style({
  width: 100,
  margin: 8,
})

export const Td = style({
  margin: 8,
})

export const Tb = style({
  overflowX: 'scroll',
  width: 'calc(100vw - 100px)',
  display: 'block',
})

export const ChildTb = style({
  paddingLeft: 8,
  background: '#e6e6e6',
})
