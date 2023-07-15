import Link from 'next/link'
import type { Database } from '../../../../../database.types'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'

type PageProps = {
  params: {
    todoId: string
  }
}

export default async function TodoDetailPage({ params }: PageProps) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: todo, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', params.todoId)
    .single()

  if (!todo) {
    return notFound()
  }

  return (
    <div className="mt-16 p-8">
      <p>Todo ID: {todo.id}</p>
      <p>Todo Title: {todo.title}</p>
      <p>Todo Content: {todo.completed ? '完了！' : '未完了...'}</p>
      <p>
        Todo Created at:
        {format(new Date(todo.created_at), 'yyyy/MM/dd HH:mm:ss')}
      </p>
      <Link href="/todos">
        <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-500" />
      </Link>
    </div>
  )
}
