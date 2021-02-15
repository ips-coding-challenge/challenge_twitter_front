import { atom, selector } from 'recoil'
import { UserType } from '../types/types'

export const userState = atom<UserType | null>({
  key: 'userState',
  default: null,
})

export const followingsState = atom({
  key: 'followingsState',
  default: selector({
    key: 'followingsSelector',
    get: ({ get }: any) => {
      return (get(userState) as UserType).followingsUsersIds
    },
  }),
})
