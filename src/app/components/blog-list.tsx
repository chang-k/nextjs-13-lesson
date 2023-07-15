import Link from 'next/link'
import type { Database } from '../../../database.types'

type Blog = Database['public']['Tables']['blogs']['Row']

async function fetchBlogs() {
  await new Promise((resolve) => setTimeout(resolve, 6000))
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

export default async function BlogList() {
  const blogs = await fetchBlogs()
  return (
    <div className="p-4">
      <p className="mb-4 pb-3 text-xl font-medium underline underline-offset-4">
        Blogs
      </p>
      <ul className="text-sm">
        {blogs.map((b) => (
          <li key={b.id} className="my-1 text-base">
            {b.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
