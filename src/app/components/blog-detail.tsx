'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import type { Database } from '../../../database.types'
import { useEffect } from 'react'

type Blog = Database['public']['Tables']['blogs']['Row']

export default function BlogDetail({ blog }: { blog: Blog }) {
  useEffect(() => {
    console.log('www')
  }, [])

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
