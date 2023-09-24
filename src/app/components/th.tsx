'use client'

import React from 'react'
import { firstTh, Th as ThCss, CalcTotal } from './th.css'

type Props = {
  hIndex: number
}

export default function Th({ hIndex }: Props) {
  if (hIndex === 0) {
    return <th className={firstTh} />
  }
  return (
    <th className={ThCss} align="left">
      <div>
        <p>Header {hIndex}</p>
        <input type="text" className={CalcTotal} />
      </div>
    </th>
  )
}
