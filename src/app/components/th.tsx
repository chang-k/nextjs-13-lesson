'use client'

import React, { memo } from 'react'
import { firstTh } from './th.css'
import ThContent from './thContent'
import ThWrapper from './thWrapper'

type Props = {
  hIndex: number // 0-10
}

function Th({ hIndex }: Props) {
  if (hIndex === 0) {
    return <th className={firstTh} />
  }
  return (
    <ThWrapper hIndex={hIndex}>
      <ThContent hIndex={hIndex} />
    </ThWrapper>
  )
}

export default memo(Th)
