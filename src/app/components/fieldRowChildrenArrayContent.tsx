'use client'

import React, { useCallback, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  type TableCell,
  type TableForm,
} from '../table/FormProvider/useTableForm'
import { Td as TdCss, ChildTbWrapper } from './table.css'
import Td from './td'
import { type DroppableProvided } from 'react-beautiful-dnd'
import TdChildrenArray from './tdChildrenArray'
import { setHighlightCell } from './hooks/useHighlightCell'
import { useOpenFlagIds } from './hooks/useAllOpenFlag'

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
  const [ids, setIds] = useOpenFlagIds()
  const [isChildOpen, setIsChildOpen] = useState(
    ids.includes(fieldRowCol?.id ?? 0)
  )

  console.log('fieldRowCol?.id ?? 0', fieldRowCol?.id ?? 0)

  const { control } = useFormContext<TableForm>()

  const setHighlight = setHighlightCell()

  const { fields, append } = useFieldArray({
    control,
    name: `${accesorName}.childrenArray`,
    keyName: 'fieldRowChildrenArrayContentKey',
  })

  // 急募: 追加した時に追加した分だけレンダリングさせたい
  const handleClickAddColArray = useCallback((obj: any): void => {
    append(obj)
  }, [])

  const handleToggleChildOpen = useCallback((): void => {
    setIsChildOpen((prev) => !prev)
  }, [setIsChildOpen, setIds])

  return (
    <td
      key={accesorName}
      className={TdCss}
      onMouseEnter={() => {
        const accesorNameArray = accesorName.split('.')
        setHighlight({
          row: Number(accesorNameArray[1]),
          col: Number(accesorNameArray[3]),
        })
      }}
    >
      <Td
        fieldRowCol={fieldRowCol}
        accesorName={accesorName}
        isChildOpen={isChildOpen}
        hasChild={fields.length !== 0}
        handleToggleChildOpen={handleToggleChildOpen}
        handleClickAddColArray={handleClickAddColArray}
      />
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={ChildTbWrapper}
      >
        {isChildOpen && (
          <TdChildrenArray
            accesorName={`${accesorName}.childrenArray`}
            fields={fields}
          />
        )}
      </div>
      {provided.placeholder}
    </td>
  )
}
