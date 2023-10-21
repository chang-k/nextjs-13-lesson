'use client'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  type TableCellChild,
  type TableForm,
} from '../table/FormProvider/useTableForm'

type Props = {
  hIndex: number // 1-10
}

export default function ThContent({ hIndex }: Props) {
  const { control } = useFormContext<TableForm>()

  // mapサボる
  const columnAll: (TableCellChild | undefined)[][] = useWatch({
    control,
    name: [
      `tableData.0.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.1.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.2.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.3.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.4.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.5.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.6.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.7.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.8.childrenArray.${hIndex - 1}.childrenArray`,
      `tableData.9.childrenArray.${hIndex - 1}.childrenArray`,
    ],
  })

  const total = columnAll.reduce((acc, subArray) => {
    if (subArray != null) {
      return (
        acc +
        (subArray
          ? subArray.reduce((subAcc, obj) => {
              if (obj != null) {
                return subAcc + Number(obj.value)
              }
              return subAcc
            }, 0)
          : 0)
      )
    }
    return acc
  }, 0)

  return (
    <div>
      <p>Header {hIndex}</p>
      <p>合計: {!isNaN(total) ? total.toLocaleString() : '-'}</p>
    </div>
  )
}
