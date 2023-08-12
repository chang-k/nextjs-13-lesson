import type { Database } from '../../../database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import BlogDetailButton from './blog-detail-button'

// type Blog = Database['public']['Tables']['blogs']['Row']

// async function fetchBlogs() {
//   const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
//     headers: new Headers({
//       apikey: process.env.apikey as string,
//     }),
//     cache: 'force-cache',
//   })
//   if (!res.ok) {
//     throw new Error('サーバーエラーです blogs')
//   }
//   const blogs: Blog[] = await res.json()
//   return blogs
// }

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
