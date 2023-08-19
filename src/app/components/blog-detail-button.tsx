'use client'

import React, { Suspense, useCallback, useState } from 'react'
import { SideModal } from './common/sideModal'
import BlogDetailLazy from './blog-detail-lazy'

type Props = {
  blogs: {
    id: string
    title: string | null
  }[]
}

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
        <Suspense fallback={<p>Loading...!</p>}>
          <BlogDetailLazy blogId={blogId} />
        </Suspense>
      </SideModal>
    </>
  )
}
