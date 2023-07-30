import React, { useRef, type ReactNode, useEffect } from 'react'
import * as styles from './sideModal.css'
import { useClickOutside } from '../hooks/useClickOutside'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const SideModal = ({ isOpen, onClose, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  // NOTE: const ref=useOutsideClick(onClose) って感じでrefを受け取りながらuseEffectするのもあり
  // 現在はdiv以外の他のElementも渡せるようにするため一応以下のようにしている
  useClickOutside(ref, onClose)

  return (
    <div
      className={`${styles.modalStyle} ${isOpen ? styles.openModalStyle : ''}`}
      ref={ref}
    >
      <button onClick={onClose}>Close</button>
      <div>{children}</div>
    </div>
  )
}
