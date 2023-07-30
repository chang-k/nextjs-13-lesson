import { style } from '@vanilla-extract/css'

export const modalStyle = style({
  position: 'fixed',
  right: '-100%',
  top: 0,
  width: '300px',
  height: '100%',
  backgroundColor: 'yellow',
  transition: 'right 0.5s',
  padding: '20px',
})

export const openModalStyle = style({
  right: 0,
})
