'use client'

import React, { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { Tb, tbody as tbodyCss, HeaderTr } from './table.css'
import Th from './th'
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'
import Tr from './tr'

export default function Table() {
  resetServerContext()

  const { handleSubmit, getValues, setValue } = useFormContext<TableForm>()

  const [fields, setFields] = useState(getValues('tableData'))

  const onSubmit = (data: TableForm) => {
    console.log('Submit', data)
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    // fields配列のコピーを作成
    // 怪奇: この時点で console.log('reorderedFields0', reorderedFields) すると、なぜか入れ替わりずみになってる、、、多分consoleの出る順番な気はしてる
    const reorderedFields = [...getValues('tableData')]
    // ドラッグ元の位置から要素を取り出す
    const [removed] = reorderedFields.splice(source.index, 1)
    // ドラッグ先の位置に要素を挿入
    reorderedFields.splice(destination.index, 0, removed)
    setFields(reorderedFields)
    setValue('tableData', reorderedFields)
  }

  // Headerをmapするためにとりあえずサボって作る
  const array = useMemo(
    () => [null, null, null, null, null, null, null, null, null, null, null],
    []
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className={Tb}>
        <thead>
          <tr className={HeaderTr}>
            {array.map((_, index) => {
              return <Th hIndex={index} key={`th-${index}`} />
            })}
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="table-body">
            {(provided) => (
              <tbody
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={tbodyCss}
              >
                {fields.map((fieldRow, rowIndex) => (
                  <Draggable
                    key={fieldRow.id}
                    draggableId={`${fieldRow.id}`}
                    index={rowIndex}
                  >
                    {(provided) => (
                      <Tr
                        rowIndex={rowIndex}
                        provided={provided}
                        rowTitle={fieldRow.rowTitle}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      <button type="submit">Submit</button>
    </form>
  )
}
