import { darkTheme } from '../stiches.config'

export function darkThemeColor(color: string): any {
  return {
    [`body.${darkTheme} &`]: {
      bc: color,
    },
  };
}

