import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../database.types'
import SupabaseListener from '../components/supabase-listener'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // サーバーコンポーネントで使用できるsupabaseのインスタンス
  const supabase = createServerComponentSupabaseClient<Database>({
    // ブラウザで持ってるアクセストークンをサーバーサイドに渡せるようにする
    headers,
    cookies,
  })

  // サーバー側のセッション情報
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <SupabaseListener accessToken={session?.access_token} />
      {children}
    </>
  )
}
