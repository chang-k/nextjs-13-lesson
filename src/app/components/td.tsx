'use client'

import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TableCell, type TableForm } from '../table/FormProvider/useTableForm'

type Props = {
  accesorName: `tableData.${number}.childrenArray.${number}.title`
  fieldRowCol: TableCell | null
}

export default function Td({ accesorName, fieldRowCol }: Props) {
  const { register } = useFormContext<TableForm>()

  const [mode, setMode] = useState<'button' | 'text' | 'edit'>(
    fieldRowCol === null ? 'button' : 'text'
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' && mode === 'edit') {
        event.preventDefault()
        setMode('text')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mode])

  if (mode === 'button') {
    return (
      <td>
        <button
          type="button"
          onClick={() => {
            console.log('ID button', accesorName)
            setMode('edit')
          }}
        >
          +
        </button>
      </td>
    )
  }
  if (mode === 'text') {
    return (
      <td>
        {fieldRowCol?.title}
        <button
          onClick={() => {
            console.log('ID edit', accesorName)
            setMode('edit')
          }}
        >
          編集
        </button>
      </td>
    )
  }
  return (
    <td>
      <input
        {...register(accesorName)}
        // onKeyDown={(event) => {
        //   if (event.key === 'Enter') {
        //     event.preventDefault()
        //   }
        // }}
      />
    </td>
  )
}
