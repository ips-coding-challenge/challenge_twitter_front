import { atom } from 'recoil'
import { UserType } from '../types/types'

export const userState = atom<UserType | null>({
  key: 'userState',
  default: null,
})
