'use client'

import { useState, useEffect } from 'react'

export default function TimerCounter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setCount((prev) => prev + 1), 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
