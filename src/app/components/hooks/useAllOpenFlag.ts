import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'

export const openFlagIds = atom<number[]>([])

export const useOpenFlagIds = () => {
  return useAtom(openFlagIds)
}

export const openFlagAtomFamily = atomFamily(
  ({ id, showChildren }: { id: number; showChildren?: boolean }) => {
    return atom({
      id,
      showChildren: showChildren ?? false,
    })
  },
  (a, b) => {
    return a.id === b.id
  }
)

export const updateOpenFlagAtomFamily = atom(
  null,
  (get, set, ids: number[], flag: boolean) => {
    ids.map((id) => {
      const atom = openFlagAtomFamily({ id })
      if (get(atom).showChildren === flag) {
        return
      }
      set(atom, {
        id,
        showChildren: flag,
      })
    })
  }
)

export const useAllOpenFlag = () => {
  return useAtom(updateOpenFlagAtomFamily)
}
