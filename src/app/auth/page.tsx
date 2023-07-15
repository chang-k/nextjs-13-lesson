import Auth from '../components/auth'

export default async function AuthPage() {
  return (
    <main
      className={`flex h-[calc(100vh-56px)] flex-col items-center justify-content`}
    >
      <Auth />
    </main>
  )
}
