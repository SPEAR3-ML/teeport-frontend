import { UPDATE_LAYOUT } from '../actionTypes'

export const updateLayout = (taskId, layout) => ({
  type: UPDATE_LAYOUT,
  taskId,
  layout,
})
