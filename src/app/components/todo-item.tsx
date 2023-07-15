'use client'

import { useRouter } from 'next/navigation'
import type { Database } from '../../../database.types'
import { useStore } from '../../../store'
import supabase from '../utils/supabase'
import Link from 'next/link'

type Todo = Database['public']['Tables']['todos']['Row']

export default function TodoItem(todo: Todo) {
  const { refresh } = useRouter()
  const updateTask = useStore((state) => state.updateEditedTask)
  const resetTask = useStore((state) => state.resetEditedTask)

  async function updateMutate(id: string, completed: boolean) {
    await supabase.from('todos').update({ completed: completed }).eq('id', id)
    resetTask()
    refresh()
  }

  async function deleteMutate(id: string) {
    await supabase.from('todos').delete().eq('id', id)
    refresh()
  }

  return (
    <li>
      <input
        type="checkbox"
        className="mr-1"
        checked={todo.completed}
        onChange={(e) => updateMutate(todo.id, !todo.completed)}
      />
      <Link href={`/auth/todo-crud/${todo.id}`}>{todo.title}</Link>
      <div className="float-right ml-20 flex">
        <button onClick={() => updateTask({ id: todo.id, title: todo.title })}>
          (編集)
        </button>
        <button onClick={() => deleteMutate(todo.id)}>(削除)</button>
      </div>
    </li>
  )
}
