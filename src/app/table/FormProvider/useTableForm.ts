'use client'

import { useForm } from 'react-hook-form'

export type TableForm = {
  tableData: TableRow[]
}

export type TableRow = {
  id: number
  rowTitle: string
  childrenArray?: (TableCell | null)[]
}

export type TableCell = {
  id: number
  title: string
  childrenArray?: (TableCell | null)[]
}

const DEFAULT_VALUES: TableForm['tableData'] = [
  {
    id: 1,
    rowTitle: '1行目',
    childrenArray: [
      {
        id: 10,
        title: 'one',
        childrenArray: [
          { id: 1000, title: 'one one' },
          { id: 1001, title: 'one one 2' },
        ],
      },
      {
        id: 11,
        title: 'one',
        childrenArray: [
          { id: 1010, title: 'one one one' },
          { id: 1011, title: 'one one one 2' },
        ],
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: 2,
    rowTitle: '2行目',
    childrenArray: [
      {
        id: 20,
        title: 'two',
        childrenArray: [
          { id: 2000, title: 'two two' },
          { id: 2001, title: 'two two 2' },
        ],
      },
      {
        id: 21,
        title: 'two',
        childrenArray: [
          { id: 2010, title: 'two two two' },
          { id: 2011, title: 'two two two 2' },
        ],
      },
      { id: 22, title: 'one' },
      null,
      null,
      null,
      { id: 26, title: 'one' },
      { id: 27, title: 'one' },
      { id: 28, title: 'one' },
      { id: 29, title: 'one' },
    ],
  },
  {
    id: 3,
    rowTitle: '3行目',
    childrenArray: [
      { id: 30, title: 'one' },
      { id: 31, title: 'one' },
      { id: 32, title: 'one' },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: 4,
    rowTitle: '4行目',
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
    rowTitle: '5行目',
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
    rowTitle: '6行目',
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
    rowTitle: '7行目',
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
    rowTitle: '8行目',
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
    rowTitle: '9行目',
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

export const useTableForm = () => {
  const methods = useForm<TableForm>({
    defaultValues: { tableData: DEFAULT_VALUES },
  })

  return methods
}
