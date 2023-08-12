'use client'

import React, { Suspense, lazy, useCallback, useState } from 'react'
import { SideModal } from './common/sideModal'
import dynamic from 'next/dynamic'

type Props = {
  blogs: {
    id: string
    title: string | null
  }[]
}

const BlogDetailLazy = dynamic(() => import('./blog-detail-lazy'))

export default function BlogDetailButton({ blogs }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [blogId, setBlogId] = useState('')

  const toggleModal = useCallback((status: boolean, blogId?: string) => {
    if (blogId) {
      setBlogId(blogId)
    } else {
      setBlogId('')
    }
    setIsOpen(status)
  }, [])

  return (
    <>
      <ul>
        {blogs.map((b) => (
          <li key={b.id}>
            <button
              onClick={() => {
                toggleModal(true, b.id)
              }}
            >
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <SideModal isOpen={isOpen} onClose={() => toggleModal(false)}>
        {/* <p>Blog Title: {blog.title}</p>
        <p>Blog Content: {blog.content}</p>
        <p>
          Blog Created at:
          {format(new Date(blog.created_at), 'yyyy/MM/dd HH:mm:ss')}
        </p> */}

        {/* 以下のように、ここでopenした時にfetchしたい */}
        {/* <SideModalChildren /> */}
        <Suspense fallback={<p>Loading...!</p>}>
          <BlogDetailLazy blogId={blogId} />
        </Suspense>
      </SideModal>
    </>
  )
}
