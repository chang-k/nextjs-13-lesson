'use client'

import React, { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { Tb, tbody as tbodyCss, Tr as TrCss, firstTd } from './table.css'
import Th from './th'
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  resetServerContext,
  type DraggableProvided,
} from 'react-beautiful-dnd'
import FieldRowChildrenArray from './fieldRowChildrenArray'
import { highlightCellValue } from './hooks/useHighlightCell'

type Props = {
  rowIndex: number
  provided: DraggableProvided
  rowTitle: string
}

export default function Tr({ rowIndex, provided, rowTitle }: Props) {
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
      <td align="center" className={firstTd} {...provided.dragHandleProps}>
        ⇨ {rowTitle}
      </td>
      <FieldRowChildrenArray
        accesorName={`tableData.${rowIndex}.childrenArray`}
      />
    </tr>
  )
}
