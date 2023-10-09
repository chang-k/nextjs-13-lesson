'use client'

import React from 'react'
import { Tr as TrCss } from './table.css'
import { type DraggableProvided } from 'react-beautiful-dnd'
import { highlightCellValue } from './hooks/useHighlightCell'

type Props = {
  rowIndex: number
  provided: DraggableProvided
  children: React.ReactElement
}

export default function TrWrapper({ rowIndex, provided, children }: Props) {
  const cellValue = highlightCellValue()

  return (
    <tr
      className={TrCss({
        isHighlight: cellValue.row === rowIndex,
      })}
      key={rowIndex}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      {children}
    </tr>
  )
}