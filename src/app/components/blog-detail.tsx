'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import type { Database } from '../../../database.types'
import { useCallback, useEffect, useState } from 'react'
import { SideModal } from './common/sideModal'

type Blog = Database['public']['Tables']['blogs']['Row']

export default function BlogDetail({ blog }: { blog: Blog }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = useCallback((status: boolean) => {
    setIsOpen(status)
  }, [])

  return (
    <div>
      <button onClick={() => toggleModal(true)}>Blog ID: {blog.id}</button>
      <SideModal isOpen={isOpen} onClose={() => toggleModal(false)}>
        <p>Blog Title: {blog.title}</p>
        <p>Blog Content: {blog.content}</p>
        <p>
          Blog Created at:
          {format(new Date(blog.created_at), 'yyyy/MM/dd HH:mm:ss')}
        </p>
      </SideModal>
      <Link href="/blogs">
        <ArrowUturnLeftIcon width={150} />
      </Link>
    </div>
  )
}
