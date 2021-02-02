import { atom } from 'recoil'

export const uploadMediaState = atom<File | null>({
  key: 'uploadMediaState',
  default: null,
})

export const uploadMediaUrlState = atom<string | null>({
  key: 'uploadMediaUrlState',
  default: null,
})

export const uploadMediaProgressState = atom<number>({
  key: 'uploadMediaProgressState',
  default: 0,
})
