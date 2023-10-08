'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import {
  DragDropContext,
  Droppable,
  type DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'
import FieldRowChildrenArrayContent from './fieldRowChildrenArrayContent'

type Props = {
  accesorName: `tableData.${number}.childrenArray`
}

export default function FieldRowChildrenArray({ accesorName }: Props) {
  resetServerContext()

  const { getValues, setValue } = useFormContext<TableForm>()

  const fields = getValues(accesorName)

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
      setValue(`${accesorName}.${strNum}.childrenArray`, reorderedFields)
      return
    }
    // 異なる階層のD&D
    if (source.droppableId !== destination.droppableId) {
      const sourceStrs = source.droppableId.split('-')
      const destinationStrs = destination.droppableId.split('-')
      const sourceStrNum = Number(sourceStrs[2])
      const destinationStrNum = Number(destinationStrs[2])
      const sourceFieldsValue =
        getValues(`${accesorName}.${sourceStrNum}.childrenArray`) ?? []
      const destinationFieldsValue =
        getValues(`${accesorName}.${destinationStrNum}.childrenArray`) ?? []
      const reorderedSourceFields = [...sourceFieldsValue]
      const reorderedDestinationFields = [...destinationFieldsValue]
      const [removed] = reorderedSourceFields.splice(source.index, 1)
      reorderedDestinationFields.splice(destination.index, 0, removed)
      setValue(
        `${accesorName}.${sourceStrNum}.childrenArray`,
        reorderedSourceFields
      )
      setValue(
        `${accesorName}.${destinationStrNum}.childrenArray`,
        reorderedDestinationFields
      )
      return
    }
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
            <FieldRowChildrenArrayContent
              fieldRowCol={fieldRowCol}
              accesorName={`${accesorName}.${colIndex}`}
              provided={provided}
            />
          )}
        </Droppable>
      ))}
    </DragDropContext>
  )
}
