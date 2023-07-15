import Link from 'next/link'
import type { Database } from '../../../../database.types'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

type Blog = Database['public']['Tables']['blogs']['Row']

type PageProps = {
  params: {
    blogId: string
  }
}

async function fetchBlog(blogId: string) {
  const res = await fetch(
    `${process.env.url}/rest/v1/blogs?id=eq.${blogId}&select=*`,
    {
      headers: new Headers({
        apikey: process.env.apikey as string,
      }),
      cache: 'force-cache',
    }
  )
  //   if (!res.ok) {
  //     throw new Error('サーバーエラーです blog')
  //   }
  const blogs: Blog[] = await res.json()
  return blogs[0]
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await fetchBlog(params.blogId)
  if (!blog) return notFound()
  return (
    <div className="mt-16 p-8">
      <p>Blog ID: {blog.id}</p>
      <p>Blog Title: {blog.title}</p>
      <p>Blog Content: {blog.content}</p>
      <p>
        Blog Created at:
        {format(new Date(blog.created_at), 'yyyy/MM/dd HH:mm:ss')}
      </p>
      <Link href="/blogs">
        <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-500" />
      </Link>
    </div>
  )
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: 'force-cache',
  })
  const blogs: Blog[] = await res.json()
  return blogs.map((b) => ({
    blogId: b.id.toString(),
  }))
}
