'use client'

import React from 'react'
import { Th as ThCss } from './th.css'
import { highlightCellValue } from './hooks/useHighlightCell'

type Props = {
  children: React.ReactElement
  hIndex: number // 1-10
}

export default function ThWrapper({ children, hIndex }: Props) {
  const cellValue = highlightCellValue()

  return (
    <th
      className={ThCss({ isHighlight: cellValue.col === hIndex - 1 })}
      align="left"
    >
      {children}
    </th>
  )
}
