import Link from 'next/link'
import type { Database } from '../../../database.types'

type Blog = Database['public']['Tables']['blogs']['Row']

async function fetchBlogs() {
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: 'force-cache',
  })
  if (!res.ok) {
    throw new Error('サーバーエラーです blogs')
  }
  const blogs: Blog[] = await res.json()
  return blogs
}

export default async function BlogListStatic() {
  const blogs = await fetchBlogs()
  return (
    <div>
      <p>Blogs</p>
      <ul>
        {blogs.map((b) => (
          <li key={b.id}>
            {/* NOTE: prefetch */}
            <Link href={`/blogs/${b.id}`} prefetch={false}>
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
