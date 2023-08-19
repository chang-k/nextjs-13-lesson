import { format } from 'date-fns'

type Props = {
  blogId: string
}

async function fetchBlog(blogId: string) {
  if (blogId === '') return
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blogs?id=eq.${blogId}&select=*`,
    {
      headers: new Headers({
        apikey: process.env.apikey as string,
      }),
      cache: 'force-cache',
    }
  )
  const blogs = await res.json()
  return blogs[0]
}

export default async function BlogDetailLazy({ blogId }: Props) {
  const blog = await fetchBlog(blogId)

  return (
    <>
      <p>Blog Title: {blog?.title}</p>
      <p>Blog Content: {blog?.content}</p>
      {blog?.created_at && (
        <p>
          Blog Created at:{' '}
          {format(new Date(blog.created_at), 'yyyy/MM/dd HH:mm:ss')}
        </p>
      )}
    </>
  )
}
