'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TableCell, type TableForm } from '../table/FormProvider/useTableForm'
import { button, edit, td, text } from './td.css'

type Props = {
  accesorName:
    | `tableData.${number}.childrenArray.${number}`
    | `tableData.${number}.childrenArray.${number}.childrenArray.${number}`
  fieldRowCol: TableCell | null
  isLastChild?: boolean
}

export default function Td({
  accesorName,
  fieldRowCol,
  isLastChild = false,
}: Props) {
  const { register, setFocus, setValue } = useFormContext<TableForm>()

  const [mode, setMode] = useState<'button' | 'text' | 'edit'>(
    fieldRowCol === null ? 'button' : 'text'
  )
  const [colTitle, setColTitle] = useState(fieldRowCol?.title ?? '')
  const [colValue, setColValue] = useState(fieldRowCol?.value ?? '')
  const [composing, setComposition] = useState(false)

  const startComposition = useCallback(() => setComposition(true), [])
  const endComposition = useCallback(() => setComposition(false), [])

  useEffect(() => {
    if (mode === 'edit') {
      setFocus(`${accesorName}.title`)
    }
  }, [mode])

  return (
    <div className={td}>
      {/* ここをコンポーネント分割して、子の方でuseWatchする */}
      {isLastChild ? (
        <input
          {...register(`${accesorName}.value`)}
          value={colValue}
          className={edit}
        />
      ) : (
        <input
          {...register(`${accesorName}.value`)}
          value={colValue}
          className={edit}
        />
      )}
      {mode === 'button' && (
        <button
          type="button"
          onClick={() => setMode('edit')}
          className={button}
        >
          +
        </button>
      )}
      {mode === 'text' && (
        <>
          <span className={text}>{colTitle}</span>
          <button onClick={() => setMode('edit')} type="button">
            編集
          </button>
        </>
      )}
      {mode === 'edit' && (
        <input
          {...register(`${accesorName}.title`)}
          value={colTitle}
          onChange={(e) => {
            register(`${accesorName}.title`).onChange(e)
            setColTitle(e.target.value)
          }}
          onBlur={(e) => {
            register(`${accesorName}.title`).onBlur(e)
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
              setValue(`${accesorName}.title`, event.currentTarget.value)
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
          className={edit}
        />
      )}
    </div>
  )
}
