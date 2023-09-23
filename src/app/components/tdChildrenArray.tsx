'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { ChildTb } from './table.css'
import Td from './td'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  accesorName: `tableData.${number}.childrenArray.${number}.childrenArray`
}

export default function TdChildrenArray({ accesorName }: Props) {
  const { getValues } = useFormContext<TableForm>()

  const fields = getValues(accesorName)

  if (!fields) return <p>None!</p>

  return (
    <>
      {fields.map((f, colIndex) => {
        // MEMO: 子の子は現在使われない
        if (f === null) return null
        return (
          <Draggable key={f.id} draggableId={`${f.id}`} index={colIndex}>
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
                  accesorName={`${accesorName}.${colIndex}.title`}
                />
              </div>
            )}
          </Draggable>
        )
      })}
    </>
  )
}
