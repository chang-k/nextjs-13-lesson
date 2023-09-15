import { style, globalStyle } from '@vanilla-extract/css'

export const rootCss = style({
  margin: 0,
})

globalStyle('table', {
  borderSpacing: 0,
})

globalStyle('th, td', {
  padding: 0,
})
