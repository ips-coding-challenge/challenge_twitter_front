import { atomFamily, selectorFamily } from 'recoil'

export const followersCountState = atomFamily({
  key: 'followersCountState',
  default: 0,
})
