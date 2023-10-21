'use client'

import React from 'react'
import { firstTd } from './table.css'
import { type DraggableProvided } from 'react-beautiful-dnd'
import FieldRowChildrenArray from './fieldRowChildrenArray'
import TrWrapper from './trWrapper'

type Props = {
  rowIndex: number
  provided: DraggableProvided
  rowTitle: string
}

export default function Tr({ rowIndex, provided, rowTitle }: Props) {
  return (
    <TrWrapper rowIndex={rowIndex} provided={provided}>
      <>
        <td align="center" className={firstTd} {...provided.dragHandleProps}>
          ⇨ {rowTitle}
        </td>
        <FieldRowChildrenArray
          accesorName={`tableData.${rowIndex}.childrenArray`}
        />
      </>
    </TrWrapper>
  )
}
