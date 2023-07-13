import Link from 'next/link'

export default function NavBar() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        {/* <Link href='/blogs'>
                    blogs
                </Link>
                <Link href='/streaming-sr'>
                    Streaming SR
                </Link>
                <Link href='/auth'>
                    Auth
                </Link> */}
      </nav>
    </header>
  )
}
