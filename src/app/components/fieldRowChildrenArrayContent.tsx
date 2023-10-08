'use client'

import React, { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  type TableCell,
  type TableForm,
} from '../table/FormProvider/useTableForm'
import { Td as TdCss, ChildTbWrapper } from './table.css'
import Td from './td'
import { type DroppableProvided } from 'react-beautiful-dnd'
import TdChildrenArray from './tdChildrenArray'

type Props = {
  fieldRowCol: TableCell | null
  accesorName: `tableData.${number}.childrenArray.${number}`
  provided: DroppableProvided
}

export default function FieldRowChildrenArrayContent({
  fieldRowCol,
  accesorName,
  provided,
}: Props) {
  const { control } = useFormContext<TableForm>()

  const { fields, append } = useFieldArray({
    control,
    name: `${accesorName}.childrenArray`,
    keyName: 'fieldRowChildrenArrayContentKey',
  })

  const handleClickAddColArray = useCallback((obj: any): void => {
    append(obj)
  }, [])

  return (
    <td key={accesorName} className={TdCss}>
      <Td
        fieldRowCol={fieldRowCol}
        accesorName={accesorName}
        handleClickAddColArray={handleClickAddColArray}
      />
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={ChildTbWrapper}
      >
        <TdChildrenArray
          accesorName={`${accesorName}.childrenArray`}
          fields={fields}
        />
      </div>
      {provided.placeholder}
    </td>
  )
}
