'use client'

import { useRouter } from 'next/navigation'
import supabase from '../utils/supabase'
import { useStore } from '../../../store'
import { FormEvent, useState } from 'react'

export default function Auth() {
  const { loginUser } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { push } = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        push('/auth/todo-crud')
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      }
    }
  }

  function signOut() {
    supabase.auth.signOut()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p>{loginUser.email}</p>
      <button onClick={signOut}>(サインアウト)</button>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            required
            placeholder="メール"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            required
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="rounded-md bg-indigo-600 text-white">
            {isLogin ? 'ログイン' : '登録'}
          </button>
        </div>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>モードチェンジ！</button>
    </div>
  )
}
