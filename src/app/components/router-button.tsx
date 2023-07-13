'use client'
import { useRouter } from 'next/navigation'

export default function RouterButton({
  destination = '',
}: {
  destination?: string
}) {
  const { push } = useRouter()
  return (
    <button onClick={() => push(`/${destination}`)}>
      Go to {destination !== '' ? destination : 'Home'}!!
    </button>
  )
}
