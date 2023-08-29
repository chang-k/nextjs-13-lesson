'use client'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TableForm } from '../table/FormProvider'

export default function Table() {
  const { handleSubmit, register, control } = useFormContext<TableForm>()

  const fields = useWatch({ control, name: 'tableData' })

  const onSubmit = (data: TableForm) => {
    console.log('Submit', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tbody>
          {fields.map((fieldRow, rowIndex) => (
            <tr key={rowIndex}>
              {fieldRow.childrenArray?.map((_, colIndex) => (
                <td key={colIndex}>
                  <input
                    {...register(
                      `tableData.${rowIndex}.childrenArray.${colIndex}.title]` as `tableData.${number}.childrenArray.${number}.title`
                    )}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  )
}
