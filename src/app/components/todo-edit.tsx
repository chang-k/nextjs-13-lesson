'use client'

import { useRouter } from 'next/navigation'
import { useStore } from '../../../store'
import supabase from '../utils/supabase'
import { FormEvent } from 'react'

export default function EditTask() {
  const { push, refresh } = useRouter()
  const { editedTask, loginUser } = useStore()
  const updateTask = useStore((state) => state.updateEditedTask)
  const reset = useStore((state) => state.resetEditedTask)

  function signOut() {
    supabase.auth.signOut()
    push('/auth')
  }

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (editedTask.id === '') {
      const { error } = await supabase
        .from('todos')
        .insert({ title: editedTask.title, user_id: loginUser.id })
      refresh()
      reset()
    } else {
      const { error } = await supabase
        .from('todos')
        .update({ title: editedTask.title })
        .eq('id', editedTask.id)
      refresh()
      reset()
    }
  }

  return (
    <div className="m-5 text-center">
      <p className="my-3">{loginUser.email}</p>
      <button className="flex justify-center text-blue-500" onClick={signOut}>
        (戻る)
      </button>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="my-2 rounded border border-gray-300"
          placeholder="新しいタスクを"
          value={editedTask.title || ''}
          onChange={(e) => updateTask({ ...editedTask, title: e.target.value })}
        />
        <button type="submit">{editedTask.id === '' ? '作成' : '更新'}</button>
      </form>
    </div>
  )
}
