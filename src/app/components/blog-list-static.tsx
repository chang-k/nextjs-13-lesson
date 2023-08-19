import type { Database } from '../../../database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import BlogDetailButton from './blog-detail-button'

export default async function BlogListStatic() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data } = await supabase.from('blogs').select('id, title')
  const blogs = data ?? []

  return (
    <div>
      <p>Blogs</p>
      <BlogDetailButton blogs={blogs} />
    </div>
  )
}
