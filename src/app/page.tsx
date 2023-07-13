import Image from 'next/image'
import NotesList from './components/notes-list'
import TimerCounter from './components/timer-counter'

// NOTE: デフォルトはサーバーコンポーネント(SC)
export default function Page() {
  return (
    <main>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={90}
        height={18}
        priority
      />
      {/* SC */}
      <NotesList />
      {/* CC(クライアントコンポーネント) */}
      {/* SCにCCはimportできる。逆は不可だが、例外的にCCのchildrenとしてSCを渡すのは可能(function全体としてはSC) */}
      <TimerCounter />
    </main>
  )
}
