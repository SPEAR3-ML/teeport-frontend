import { fromJS } from 'immutable'

import { UPDATE_LAYOUT, ADD_LAYOUT, REMOVE_LAYOUT } from '../actionTypes'
import { getNewLayout } from '../../utils/helpers'

const initialState = fromJS({})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUT:
      return state.set(action.taskId, fromJS(action.layout))
    case ADD_LAYOUT:
      return state.withMutations(prev => {
        const layouts = prev.get(action.taskId).toJS()
        const itemLg = getNewLayout(layouts.lg, 3, 12)
        const itemMd = getNewLayout(layouts.md, 4, 12)
        const itemSm = getNewLayout(layouts.sm, 6, 12)
        const itemXs = getNewLayout(layouts.xs, 12, 12)

        prev.setIn([action.taskId, 'lg', layouts.lg.length], fromJS(itemLg))
        prev.setIn([action.taskId, 'md', layouts.md.length], fromJS(itemMd))
        prev.setIn([action.taskId, 'sm', layouts.sm.length], fromJS(itemSm))
        prev.setIn([action.taskId, 'xs', layouts.xs.length], fromJS(itemXs))
      })
    case REMOVE_LAYOUT:
      return state.withMutations(prev => {
        prev.removeIn([action.taskId, 'lg', action.i])
        prev.removeIn([action.taskId, 'md', action.i])
        prev.removeIn([action.taskId, 'sm', action.i])
        prev.removeIn([action.taskId, 'xs', action.i])
      })
    default:
      return state
  }
}

export default reducer
