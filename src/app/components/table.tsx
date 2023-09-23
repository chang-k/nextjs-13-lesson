'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { Tb, tbody as tbodyCss, Tr, Th, firstTh, firstTd } from './table.css'
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'
import FieldRowChildrenArray from './fieldRowChildrenArray'

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
            <th className={Th} align="left">
              Header1
            </th>
            <th className={Th} align="left">
              Header2
            </th>
            <th className={Th} align="left">
              Header3
            </th>
            <th className={Th} align="left">
              Header4
            </th>
            <th className={Th} align="left">
              Header5
            </th>
            <th className={Th} align="left">
              Header6
            </th>
            <th className={Th} align="left">
              Header7
            </th>
            <th className={Th} align="left">
              Header8
            </th>
            <th className={Th} align="left">
              Header9
            </th>
            <th className={Th} align="left">
              Header10
            </th>
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
                      <tr
                        className={Tr}
                        key={rowIndex}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <td
                          align="center"
                          className={firstTd}
                          {...provided.dragHandleProps}
                        >
                          ⇨ {fieldRow.rowTitle}
                        </td>
                        <FieldRowChildrenArray
                          accesorName={`tableData.${rowIndex}.childrenArray`}
                        />
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
