'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import {
  Tb,
  tbody as tbodyCss,
  Tr,
  Th,
  Td as TdCss,
  firstTh,
  firstTd,
  ChildTb,
} from './table.css'
import Td from './td'
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'
import TdChildrenArray from './tdChildrenArray'

type Props = {
  accesorName: `tableData.${number}.childrenArray`
}

export default function FieldRowChildrenArray({ accesorName }: Props) {
  resetServerContext()

  const { getValues, setValue } = useFormContext<TableForm>()

  const [fields, setFields] = useState(getValues(accesorName))

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    // 同階層のD&D
    if (source.droppableId === destination.droppableId) {
      const strs = source.droppableId.split('-')
      const strNum = Number(strs[2])
      const fieldsValue =
        getValues(`${accesorName}.${strNum}.childrenArray`) ?? []
      const reorderedFields = [...fieldsValue]
      const [removed] = reorderedFields.splice(source.index, 1)
      reorderedFields.splice(destination.index, 0, removed)
      const reorderedRowFields =
        fields?.map((f, index) => {
          if (index !== strNum) return f
          if (f === null) return null
          return {
            ...f,
            childrenArray: reorderedFields,
          }
        }) ?? []
      setFields(reorderedRowFields)
      setValue(`${accesorName}.${strNum}.childrenArray`, reorderedFields)
      return
    }
    // 異なる階層のD&D
    const fieldsVale = getValues(accesorName) ?? []
    const reorderedFields = [...fieldsVale]
    const [removed] = reorderedFields.splice(source.index, 1)
    reorderedFields.splice(destination.index, 0, removed)
    setFields(reorderedFields)
    setValue(accesorName, reorderedFields)
  }

  if (!fields) return <p>None</p>

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {fields.map((fieldRowCol, colIndex) => (
        <Droppable
          droppableId={`td-children-${colIndex}`}
          key={`td-children-${colIndex}`}
        >
          {(provided) => (
            <td key={`${accesorName}.${colIndex}`} className={TdCss}>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Td
                  fieldRowCol={fieldRowCol}
                  accesorName={`${accesorName}.${colIndex}.title`}
                />
                <TdChildrenArray
                  accesorName={`${accesorName}.${colIndex}.childrenArray`}
                />
              </div>
            </td>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  )
}
