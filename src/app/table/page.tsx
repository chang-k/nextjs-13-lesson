import { Suspense } from 'react'
import Table from '../components/table'
import FormProvider from './FormProvider'

export default function TablePage() {
  return (
    // <Suspense fallback={<>!LoadinG!</>}>
    <FormProvider>
      <Table />
    </FormProvider>
    // </Suspense>
  )
}
