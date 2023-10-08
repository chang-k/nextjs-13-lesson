'use client'

import React, { memo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'

type Props = {
  accesorName: `tableData.${number}.childrenArray.${number}`
}

function ParentNumberInput({ accesorName }: Props) {
  const { control } = useFormContext<TableForm>()

  const defaultColValue = useWatch({ control, name: accesorName })

  const total = defaultColValue?.childrenArray?.reduce(
    (accumulator, currentObj) =>
      accumulator + (currentObj ? Number(currentObj.value) : 0),
    0
  )

  return <p>計 {total ? total.toLocaleString() : '(数値無し)'}</p>
}

export default memo(ParentNumberInput)
