// import { atomWithStorage } from 'jotai/utils'

// export const darkModeAtom = atomWithStorage('darkMode', false)

import { atom } from "jotai";

export const uiStateAtom = atom({
  darkMode: false,
  localeTime: 'yeyeye'
});
