import { format } from 'date-fns'
import type { Database } from '../../../database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'

type Props = {
  blogId: string
}

export default async function BlogDetailLazy({ blogId }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data } = await supabase.from('blogs').select('*').eq('id', blogId)
  const blog = data?.[0]

  return (
    <>
      <p>Blog Title: {blog?.title}</p>
      <p>Blog Content: {blog?.content}</p>
      {blog?.created_at && (
        <p>
          Blog Created at:
          {format(new Date(blog.created_at), 'yyyy/MM/dd HH:mm:ss')}
        </p>
      )}
    </>
  )
}
