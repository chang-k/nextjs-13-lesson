export default function TableLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <p>テーブルパフォーマンス試し場所</p>
      {children}
    </main>
  )
}
