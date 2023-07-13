import { Suspense } from 'react'
import BlogListStatic from '../components/blog-list-static'
import RefreshButton from '../components/refresh-button'
import Spinner from '../components/spinner'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <aside>
        <Suspense fallback={<Spinner color="border-green-500" />}>
          <BlogListStatic />
        </Suspense>
        <div>
          <RefreshButton />
        </div>
      </aside>
      <main>{children}</main>
    </section>
  )
}
