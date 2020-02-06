import { INCREASE_COUNT, UPDATE_LAYOUT } from '../actionTypes'

export const increaseCount = () => ({
  type: INCREASE_COUNT,
})

export const updateLayout = layout => ({
  type: UPDATE_LAYOUT,
  layout,
})
