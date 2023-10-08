'use client'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { ChildTb } from './table.css'
import Td from './td'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  accesorName: `tableData.${number}.childrenArray.${number}.childrenArray`
}

export default function TdChildrenArray({ accesorName }: Props) {
  const { control } = useFormContext<TableForm>()

  // 追加した分だけレンダリングした方がいい？その場合useWatchは使えなそう
  const fields = useWatch({ control, name: accesorName })

  if (!fields) return <p>None!</p>

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
