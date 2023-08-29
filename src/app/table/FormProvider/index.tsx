'use client'

import { FormProvider as Provider, useForm } from 'react-hook-form'
import { useTableForm } from './useTableForm'

export default function FormProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const methods = useTableForm()

  return <Provider {...methods}>{children}</Provider>
}
