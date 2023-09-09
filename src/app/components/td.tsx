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

  const [colTitle, setColTitle] = useState(fieldRowCol?.title ?? '')

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
        <button type="button" onClick={() => setMode('edit')}>
          +
        </button>
      </td>
    )
  }
  if (mode === 'text') {
    return (
      <td>
        {colTitle}
        <button onClick={() => setMode('edit')}>編集</button>
      </td>
    )
  }
  return (
    <td>
      <input
        {...register(accesorName)}
        onChange={(e) => {
          register(accesorName).onChange(e)
          setColTitle(e.target.value)
        }}
        onBlur={(e) => {
          register(accesorName).onBlur(e)
          setMode('text')
        }}
        // onKeyDown={(event) => {
        //   if (event.key === 'Enter') {
        //     event.preventDefault()
        //   }
        // }}
      />
    </td>
  )
}
