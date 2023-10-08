'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  type TableCell,
  type TableForm,
} from '../table/FormProvider/useTableForm'
import { button, edit, td, text } from './td.css'
import LastChildNumberInput from './lastChildNumberInput'
import ParentNumberInput from './parentNumberInput'

type Props = {
  accesorName:
    | `tableData.${number}.childrenArray.${number}`
    | `tableData.${number}.childrenArray.${number}.childrenArray.${number}`
  fieldRowCol: TableCell | null
  isLastChild?: boolean
  handleClickAddColArray?: (obj: any) => void
}

export default function Td({
  accesorName,
  fieldRowCol,
  isLastChild = false,
  handleClickAddColArray,
}: Props) {
  const { register, setFocus, setValue } = useFormContext<TableForm>()

  const [mode, setMode] = useState<'button' | 'text' | 'edit'>(
    // idが無い場合D&Dが終わった後問答無用でedit状態になる。これはAtomでやった方がいいかも
    fieldRowCol === null ? 'button' : fieldRowCol.id == null ? 'edit' : 'text'
  )
  const [colTitle, setColTitle] = useState(fieldRowCol?.title ?? '')
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
      {isLastChild ? (
        <LastChildNumberInput
          accesorName={
            accesorName as `tableData.${number}.childrenArray.${number}.childrenArray.${number}`
          }
        />
      ) : (
        <ParentNumberInput
          accesorName={
            accesorName as `tableData.${number}.childrenArray.${number}`
          }
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
      {!isLastChild && (
        <button
          onClick={() =>
            handleClickAddColArray?.({
              // idが一意でないとD&D出来ないため暫定対応
              id: Date.now().toString(),
              title: 'new!',
              value: '0',
            })
          }
          type="button"
        >
          子要素追加
        </button>
      )}
    </div>
  )
}
