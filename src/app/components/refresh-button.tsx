'use client'
import { useRouter } from 'next/navigation'

export default function RefreshButton() {
  const { refresh } = useRouter()
  return <button onClick={refresh}>Refresh</button>
}
