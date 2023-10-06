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
  // MEMO: サーバから返ってくるかどうかは今は考慮していないが、サーバ的には要らなそう。フロントの都合的には必要、と思ったけどフロントでもいらんかも
  value: string
  childrenArray?: (TableCellChild | null)[]
}

export type TableCellChild = {
  id: number
  title: string
  // MEMO: フロント用にサーバーから返ってくるnumberデータをstringにするみたいな処理を挟んだ方が良さそうだけど省略してサボる。ここら辺はPJによりけり
  value: string
}

// フロント用変換後前提のデータ
const DEFAULT_VALUES: TableForm['tableData'] = [
  {
    id: 1,
    rowTitle: '1行目',
    childrenArray: [
      {
        id: 10,
        title: 'one',
        value: '',
        childrenArray: [
          { id: 1000, title: 'one one', value: '11' },
          { id: 1001, title: 'one one 2', value: '12' },
        ],
      },
      {
        id: 11,
        title: 'one',
        value: '',
        childrenArray: [
          { id: 1010, title: 'one one one', value: '111' },
          { id: 1011, title: 'one one one 2', value: '112' },
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
        value: '',
        childrenArray: [
          { id: 2000, title: 'two two', value: '22' },
          { id: 2001, title: 'two two 2', value: '222' },
        ],
      },
      {
        id: 21,
        title: 'two',
        value: '',
        childrenArray: [
          { id: 2010, title: 'two two two', value: '222' },
          { id: 2011, title: 'two two two 2', value: '222' },
        ],
      },
      { id: 22, title: 'one', value: '' },
      null,
      null,
      null,
      { id: 26, title: 'one', value: '' },
      { id: 27, title: 'one', value: '' },
      { id: 28, title: 'one', value: '' },
      { id: 29, title: 'one', value: '' },
    ],
  },
  {
    id: 3,
    rowTitle: '3行目',
    childrenArray: [
      { id: 30, title: 'one', value: '' },
      { id: 31, title: 'one', value: '' },
      { id: 32, title: 'one', value: '' },
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
      { id: 40, title: 'one', value: '' },
      { id: 41, title: 'one', value: '' },
      { id: 42, title: 'one', value: '' },
      { id: 43, title: 'one', value: '' },
      { id: 44, title: 'one', value: '' },
      { id: 45, title: 'one', value: '' },
      { id: 46, title: 'one', value: '' },
      { id: 47, title: 'one', value: '' },
      { id: 48, title: 'one', value: '' },
      { id: 49, title: 'one', value: '' },
    ],
  },
  {
    id: 5,
    rowTitle: '5行目',
    childrenArray: [
      { id: 50, title: 'one', value: '' },
      { id: 51, title: 'one', value: '' },
      { id: 52, title: 'one', value: '' },
      { id: 53, title: 'one', value: '' },
      { id: 54, title: 'one', value: '' },
      { id: 55, title: 'one', value: '' },
      { id: 56, title: 'one', value: '' },
      { id: 57, title: 'one', value: '' },
      { id: 58, title: 'one', value: '' },
      { id: 59, title: 'one', value: '' },
    ],
  },
  {
    id: 6,
    rowTitle: '6行目',
    childrenArray: [
      { id: 60, title: 'one', value: '' },
      { id: 61, title: 'one', value: '' },
      { id: 62, title: 'one', value: '' },
      { id: 63, title: 'one', value: '' },
      { id: 64, title: 'one', value: '' },
      { id: 65, title: 'one', value: '' },
      { id: 66, title: 'one', value: '' },
      { id: 67, title: 'one', value: '' },
      { id: 68, title: 'one', value: '' },
      { id: 69, title: 'one', value: '' },
    ],
  },
  {
    id: 7,
    rowTitle: '7行目',
    childrenArray: [
      { id: 70, title: 'one', value: '' },
      { id: 71, title: 'one', value: '' },
      { id: 72, title: 'one', value: '' },
      { id: 73, title: 'one', value: '' },
      { id: 74, title: 'one', value: '' },
      { id: 75, title: 'one', value: '' },
      { id: 76, title: 'one', value: '' },
      { id: 77, title: 'one', value: '' },
      { id: 78, title: 'one', value: '' },
      { id: 79, title: 'one', value: '' },
    ],
  },
  {
    id: 8,
    rowTitle: '8行目',
    childrenArray: [
      { id: 80, title: 'one', value: '' },
      { id: 81, title: 'one', value: '' },
      { id: 82, title: 'one', value: '' },
      { id: 83, title: 'one', value: '' },
      { id: 84, title: 'one', value: '' },
      { id: 85, title: 'one', value: '' },
      { id: 86, title: 'one', value: '' },
      { id: 87, title: 'one', value: '' },
      { id: 88, title: 'one', value: '' },
      { id: 89, title: 'one', value: '' },
    ],
  },
  {
    id: 9,
    rowTitle: '9行目',
    childrenArray: [
      { id: 90, title: 'one', value: '' },
      { id: 91, title: 'one', value: '' },
      { id: 92, title: 'one', value: '' },
      { id: 93, title: 'one', value: '' },
      { id: 94, title: 'one', value: '' },
      { id: 95, title: 'one', value: '' },
      { id: 96, title: 'one', value: '' },
      { id: 97, title: 'one', value: '' },
      { id: 98, title: 'one', value: '' },
      { id: 99, title: 'one', value: '' },
    ],
  },
]

export const useTableForm = () => {
  const methods = useForm<TableForm>({
    defaultValues: { tableData: DEFAULT_VALUES },
  })

  return methods
}
