'use client'

import React from 'react'
import { Tr as TrCss } from './table.css'
import { type DraggableProvided } from 'react-beautiful-dnd'

type Props = {
  rowIndex: number
  provided: DraggableProvided
  children: React.ReactElement
}

export default function TrWrapper({ rowIndex, provided, children }: Props) {
  return (
    <tr
      className={TrCss}
      key={rowIndex}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      {children}
    </tr>
  )
}
