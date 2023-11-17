'use client'

import React from 'react'
import { firstTd } from './table.css'
import { type DraggableProvided } from 'react-beautiful-dnd'
import FieldRowChildrenArray from './fieldRowChildrenArray'
import TrWrapper from './trWrapper'
import { useAllOpenFlag, useOpenFlagIds } from './hooks/useAllOpenFlag'

type Props = {
  rowIndex: number
  provided: DraggableProvided
  rowTitle: string
}

export default function Tr({ rowIndex, provided, rowTitle }: Props) {
  const [, setAllOpenFlag] = useAllOpenFlag()
  const [ids] = useOpenFlagIds()

  const handleClickAllOpen = (): void => {
    setAllOpenFlag(ids, true)
  }

  const handleClickAllClose = (): void => {
    setAllOpenFlag(ids, false)
  }

  return (
    <TrWrapper rowIndex={rowIndex} provided={provided}>
      <>
        <td align="center" className={firstTd} {...provided.dragHandleProps}>
          <p>⇨ {rowTitle}</p>
          <button onClick={handleClickAllOpen} type="button">
            ALL OPEN
          </button>
          <button onClick={handleClickAllClose} type="button">
            ALL CLOSE
          </button>
        </td>
        <FieldRowChildrenArray
          accesorName={`tableData.${rowIndex}.childrenArray`}
        />
      </>
    </TrWrapper>
  )
}
