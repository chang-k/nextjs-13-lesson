'use client'

import { useRouter } from 'next/navigation'
import supabase from '../utils/supabase'
import { useStore } from '../../../store'
import { useEffect } from 'react'

export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string
}) {
  const { refresh } = useRouter()
  const { updateLoginUser } = useStore()

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        updateLoginUser({
          id: data.session.user.id,
          email: data.session.user.email,
        })
      }
    }
    getUserInfo()
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id, email: session?.user.email })
      // サーバーサイドのトークン(accessToken)とクライアントサイドのトークン(session?.access_token)が一致しない場合、refresh()でサーバーコンポーネントを再実行する
      if (session?.access_token === accessToken) {
        alert('セッション違い！')
        refresh()
      }
    })
  }, [accessToken])

  return null
}
