'use client'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { Tb, Tr, firstTh } from './table.css'
import Td from './td'

export default function Table() {
  const { handleSubmit, control } = useFormContext<TableForm>()

  // 入力のたびにこれがwatchされる
  const fields = useWatch({ control, name: 'tableData' })

  console.log('fields', fields)

  const onSubmit = (data: TableForm) => {
    console.log('Submit', data)
  }

  //   データにnullが入ってくる前提にしたから使ってないけど消すのも勿体無いから残す
  //   const mostLength = useMemo(() => {
  //     const mostLength = fields.reduce(
  //       (previousValue: number, currentValue: TableCell) => {
  //         if (!currentValue.childrenArray) return 0
  //         return previousValue > currentValue.childrenArray.length
  //           ? previousValue
  //           : currentValue.childrenArray.length
  //       },
  //       0
  //     )
  //     return mostLength
  //   }, [fields])

  //   const fieldsAfter: TableCell[] = fields.map((f) => {
  //     if (!f.childrenArray) {
  //       return { ...f, childrenArray: new Array(mostLength) }
  //     }
  //     if (f.childrenArray.length < mostLength) {
  //       let array = [...f.childrenArray] as (TableCell | null)[]
  //       for (
  //         let index = 0;
  //         index < mostLength - f.childrenArray.length;
  //         index++
  //       ) {
  //         array.push(null)
  //       }
  //       return { ...f, childrenArray: array }
  //     }
  //     return f
  //   })

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
        <tbody>
          {fields.map((fieldRow, rowIndex) => (
            <tr className={Tr} key={rowIndex}>
              <td className={firstTh}>{fieldRow.rowTitle}</td>
              {fieldRow.childrenArray?.map((fieldRowCol, colIndex) => (
                <Td
                  fieldRowCol={fieldRowCol}
                  accesorName={`tableData.${rowIndex}.childrenArray.${colIndex}.title`}
                  key={`tableData.${rowIndex}.childrenArray.${colIndex}.title`}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  )
}
