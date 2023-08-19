import * as React from 'react'
import { spinnerStyle } from './spinner.css'

type Props = {
  color?: string
}

export default function Spinner({ color = 'blue' }: Props) {
  return (
    <div>
      <div className={spinnerStyle} style={{ color }} />
    </div>
  )
}
