'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { type TableForm } from '../table/FormProvider/useTableForm'
import { edit } from './td.css'

type Props = {
  accesorName: `tableData.${number}.childrenArray.${number}.childrenArray.${number}`
}

export default function LastChildNumberInput({ accesorName }: Props) {
  const { register, getValues, setValue } = useFormContext<TableForm>()

  // Question: PropsでfieldRowColを持ってくると、無駄なレンダリングが走る？
  const defaultColValue = getValues(accesorName)

  const [colValue, setColValue] = useState(defaultColValue?.value ?? '')

  return (
    <input
      {...register(`${accesorName}.value`)}
      value={colValue}
      onChange={(e) => {
        register(`${accesorName}.value`).onChange(e)
        setColValue(e.target.value)
      }}
      onBlur={(e) => {
        register(`${accesorName}.value`).onBlur(e)
        setColValue(e.target.value)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          setValue(`${accesorName}.value`, event.currentTarget.value)
        }
      }}
      className={edit}
    />
  )
}
