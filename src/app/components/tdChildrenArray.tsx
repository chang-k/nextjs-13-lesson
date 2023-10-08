'use client'

import React from 'react'
import { type TableCellChild } from '../table/FormProvider/useTableForm'
import { ChildTb } from './table.css'
import Td from './td'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  accesorName: `tableData.${number}.childrenArray.${number}.childrenArray`
  fields: (TableCellChild | null)[]
}

export default function TdChildrenArray({ accesorName, fields }: Props) {
  if (fields.length === 0) return <p>None!</p>

  return (
    <>
      {fields.map((f, colIndex) => {
        // MEMO: 子の子は現在使われない
        if (f === null) return null
        return (
          <Draggable
            key={`${f.id ?? 0}-${colIndex}`}
            draggableId={`${f.id ?? 0}-${colIndex}`}
            index={colIndex}
          >
            {(provided) => (
              <div
                key={`${accesorName}.${colIndex}.title`}
                className={ChildTb}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Td
                  fieldRowCol={f}
                  accesorName={`${accesorName}.${colIndex}`}
                  isLastChild
                />
              </div>
            )}
          </Draggable>
        )
      })}
    </>
  )
}
