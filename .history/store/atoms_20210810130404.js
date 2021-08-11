
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const darkModeAtom = atomWithStorage('darkMode', false)
