import { atom, useSetAtom, useAtomValue } from 'jotai'

const hoveredCellAtom = atom({ row: -1, col: -1 })

export const highlightCellValue = () => {
  return useAtomValue(hoveredCellAtom)
}

export const setHighlightCell = () => {
  return useSetAtom(hoveredCellAtom)
}
