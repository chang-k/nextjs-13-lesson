export default function FirstLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <p>Layout 1</p>
      {children}
    </main>
  )
}
