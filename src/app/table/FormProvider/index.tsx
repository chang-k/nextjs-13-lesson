'use client'

import { FormProvider as Provider, useForm } from 'react-hook-form'

export type TableForm = {
  tableData: TableCell[]
}

type TableCell = {
  id: number
  title: string
  childrenArray?: TableCell[]
}

const DEFAULT_VALUES: TableForm['tableData'] = [
  {
    id: 1,
    title: 'one',
    childrenArray: [
      {
        id: 10,
        title: 'one',
        childrenArray: [
          { id: 1000, title: 'one' },
          { id: 1001, title: 'one' },
        ],
      },
      { id: 11, title: 'one' },
    ],
  },
  {
    id: 2,
    title: 'one',
    childrenArray: [
      { id: 20, title: 'one' },
      { id: 21, title: 'one' },
      { id: 22, title: 'one' },
      { id: 23, title: 'one' },
      { id: 24, title: 'one' },
      { id: 25, title: 'one' },
      { id: 26, title: 'one' },
      { id: 27, title: 'one' },
      { id: 28, title: 'one' },
      { id: 29, title: 'one' },
    ],
  },
  {
    id: 3,
    title: 'one',
    childrenArray: [
      { id: 30, title: 'one' },
      { id: 31, title: 'one' },
      { id: 32, title: 'one' },
    ],
  },
  {
    id: 4,
    title: 'one',
    childrenArray: [
      { id: 40, title: 'one' },
      { id: 41, title: 'one' },
      { id: 42, title: 'one' },
      { id: 43, title: 'one' },
      { id: 44, title: 'one' },
      { id: 45, title: 'one' },
      { id: 46, title: 'one' },
      { id: 47, title: 'one' },
      { id: 48, title: 'one' },
      { id: 49, title: 'one' },
    ],
  },
  {
    id: 5,
    title: 'one',
    childrenArray: [
      { id: 50, title: 'one' },
      { id: 51, title: 'one' },
      { id: 52, title: 'one' },
      { id: 53, title: 'one' },
      { id: 54, title: 'one' },
      { id: 55, title: 'one' },
      { id: 56, title: 'one' },
      { id: 57, title: 'one' },
      { id: 58, title: 'one' },
      { id: 59, title: 'one' },
    ],
  },
  {
    id: 6,
    title: 'one',
    childrenArray: [
      { id: 60, title: 'one' },
      { id: 61, title: 'one' },
      { id: 62, title: 'one' },
      { id: 63, title: 'one' },
      { id: 64, title: 'one' },
      { id: 65, title: 'one' },
      { id: 66, title: 'one' },
      { id: 67, title: 'one' },
      { id: 68, title: 'one' },
      { id: 69, title: 'one' },
    ],
  },
  {
    id: 7,
    title: 'one',
    childrenArray: [
      { id: 70, title: 'one' },
      { id: 71, title: 'one' },
      { id: 72, title: 'one' },
      { id: 73, title: 'one' },
      { id: 74, title: 'one' },
      { id: 75, title: 'one' },
      { id: 76, title: 'one' },
      { id: 77, title: 'one' },
      { id: 78, title: 'one' },
      { id: 79, title: 'one' },
    ],
  },
  {
    id: 8,
    title: 'one',
    childrenArray: [
      { id: 80, title: 'one' },
      { id: 81, title: 'one' },
      { id: 82, title: 'one' },
      { id: 83, title: 'one' },
      { id: 84, title: 'one' },
      { id: 85, title: 'one' },
      { id: 86, title: 'one' },
      { id: 87, title: 'one' },
      { id: 88, title: 'one' },
      { id: 89, title: 'one' },
    ],
  },
  {
    id: 9,
    title: 'one',
    childrenArray: [
      { id: 90, title: 'one' },
      { id: 91, title: 'one' },
      { id: 92, title: 'one' },
      { id: 93, title: 'one' },
      { id: 94, title: 'one' },
      { id: 95, title: 'one' },
      { id: 96, title: 'one' },
      { id: 97, title: 'one' },
      { id: 98, title: 'one' },
      { id: 99, title: 'one' },
    ],
  },
]

export default function FormProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const methods = useForm<TableForm>({
    defaultValues: { tableData: DEFAULT_VALUES },
  })

  return <Provider {...methods}>{children}</Provider>
}
