'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TableCell, type TableForm } from '../table/FormProvider/useTableForm'

type Props = {
  accesorName: `tableData.${number}.childrenArray.${number}.title`
  fieldRowCol: TableCell | null
}

export default function Td({ accesorName, fieldRowCol }: Props) {
  const { register, setFocus, setValue } = useFormContext<TableForm>()

  const [mode, setMode] = useState<'button' | 'text' | 'edit'>(
    fieldRowCol === null ? 'button' : 'text'
  )
  const [colTitle, setColTitle] = useState(fieldRowCol?.title ?? '')
  const [composing, setComposition] = useState(false)

  const startComposition = useCallback(() => setComposition(true), [])
  const endComposition = useCallback(() => setComposition(false), [])

  useEffect(() => {
    if (mode === 'edit') {
      setFocus(accesorName)
    }
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
        <button onClick={() => setMode('edit')} type="button">
          編集
        </button>
      </td>
    )
  }
  return (
    <td>
      <input
        {...register(accesorName)}
        value={colTitle}
        onChange={(e) => {
          register(accesorName).onChange(e)
          setColTitle(e.target.value)
        }}
        onBlur={(e) => {
          register(accesorName).onBlur(e)
          if (colTitle !== '') {
            setColTitle(e.target.value)
            setMode('text')
          } else {
            setMode('button')
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !composing) {
            event.preventDefault()
            setValue(accesorName, event.currentTarget.value)
            if (colTitle !== '') {
              setColTitle(event.currentTarget.value)
              setMode('text')
            } else {
              setMode('button')
            }
          }
        }}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
      />
    </td>
  )
}
