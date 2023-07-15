import type { Database } from '../../../database.types'
import { format } from 'date-fns'

type Note = Database['public']['Tables']['notes']['Row']

async function fetchNotes() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // NOTE: https://app.supabase.com/project/(url)/api?resource=notes でBashでfetchするver
  const res = await fetch(`${process.env.url}/rest/v1/notes?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: 'no-store',
    // next: {revalidate: 10}
  })
  if (!res.ok) {
    throw new Error('サーバーエラーです')
  }
  const notes: Note[] = await res.json()
  return notes
}

export default async function NotesList() {
  const notes = await fetchNotes()
  return (
    <div>
      <p className="my-4 pb-3 text-xl font-medium underline underline-offset-4">
        Notes
      </p>
      <ul className="m-3">
        {notes.map((n) => (
          <li key={n.id}>
            <p>{n.title}</p>
            <p>
              Created at:{' '}
              {format(new Date(n.created_at), 'yyyy/MM/dd HH:mm:ss')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
