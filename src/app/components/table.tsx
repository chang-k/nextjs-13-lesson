'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { Tb, Tr, firstTh } from './table.css'
import Td from './td'
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className={Tb}>
        <thead>
          <tr className={Tr}>
            <th className={firstTh} />
            <th>Header1</th>
            <th>Header2</th>
            <th>Header3</th>
            <th>Header4</th>
            <th>Header5</th>
            <th>Header6</th>
            <th>Header7</th>
            <th>Header8</th>
            <th>Header9</th>
            <th>Header10</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="table-body">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {fields.map((fieldRow, rowIndex) => (
                  <Draggable
                    key={fieldRow.id}
                    draggableId={`${fieldRow.id}`}
                    index={rowIndex}
                  >
                    {(provided) => (
                      <tr
                        className={Tr}
                        key={rowIndex}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <td className={firstTh} {...provided.dragHandleProps}>
                          {fieldRow.rowTitle}
                        </td>
                        {fieldRow.childrenArray?.map(
                          (fieldRowCol, colIndex) => (
                            <Td
                              fieldRowCol={fieldRowCol}
                              accesorName={`tableData.${rowIndex}.childrenArray.${colIndex}.title`}
                              key={`tableData.${rowIndex}.childrenArray.${colIndex}.title`}
                            />
                          )
                        )}
                      </tr>
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
