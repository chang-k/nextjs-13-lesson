import type { Database } from '../../../database.types'
import Counter from './counter'

type News = Database['public']['Tables']['news']['Row']

async function fetchNews() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.url}/rest/v1/news?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: 'force-cache',
  })
  if (!res.ok) {
    throw new Error('サーバーエラーです news')
  }
  const news: News[] = await res.json()
  return news
}

export default async function NewsList() {
  const news = await fetchNews()
  return (
    <div className="m-1 border border-blue-500 p-4">
      <Counter />
      <p className="mb-4 pb-3 text-xl font-medium underline underline-offset-4">
        News
      </p>
      <ul className="text-sm">
        {news.map((n) => (
          <li key={n.id} className="my-1 text-base">
            {n.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
