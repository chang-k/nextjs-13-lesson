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
