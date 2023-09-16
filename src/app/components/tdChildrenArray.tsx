'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { Tr, ChildTb } from './table.css'
import Td from './td'
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'

type Props = {
  // childrenArray: (TableCell | null)[] | null
  accesorName: `tableData.${number}.childrenArray.${number}.childrenArray`
}

export default function TdChildrenArray({ accesorName }: Props) {
  resetServerContext()

  const { getValues, setValue } = useFormContext<TableForm>()

  const [fields, setFields] = useState(getValues(accesorName))

  console.log('fields acc', fields, accesorName)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    console.log('source, destination', source, destination)
    const fieldsVale = getValues(accesorName) ?? []
    const reorderedFields = [...fieldsVale]
    const [removed] = reorderedFields.splice(source.index, 1)
    reorderedFields.splice(destination.index, 0, removed)
    setFields(reorderedFields)
    setValue(accesorName, reorderedFields)
  }

  if (!fields) return <p>None!</p>

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`td-children-${accesorName}`}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
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
                      {/* <span {...provided.dragHandleProps}>Handle</span> */}
                      <Td
                        fieldRowCol={f}
                        accesorName={`${accesorName}.${colIndex}.title`}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
