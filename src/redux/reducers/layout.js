import { fromJS } from 'immutable'

import { UPDATE_LAYOUTS, ADD_LAYOUT, REMOVE_LAYOUT } from '../actionTypes'
import { getNewLayout } from '../../utils/helpers'

const initialState = fromJS({})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUTS:
      return state.set(action.taskId, fromJS(action.layout))
    case ADD_LAYOUT:
      return state.withMutations(prev => {
        const layouts = prev.get(action.taskId).toJS()
        const idx = layouts.lg.findIndex(layout => layout.i === action.layoutId)
        if (idx === -1) {
          const itemLg = getNewLayout(layouts.lg, action.layoutId, 3, 8)
          const itemMd = getNewLayout(layouts.md, action.layoutId, 4, 8)
          const itemSm = getNewLayout(layouts.sm, action.layoutId, 6, 8)
          const itemXs = getNewLayout(layouts.xs, action.layoutId, 12, 8)

          prev.setIn([action.taskId, 'lg', layouts.lg.length], fromJS(itemLg))
          prev.setIn([action.taskId, 'md', layouts.md.length], fromJS(itemMd))
          prev.setIn([action.taskId, 'sm', layouts.sm.length], fromJS(itemSm))
          prev.setIn([action.taskId, 'xs', layouts.xs.length], fromJS(itemXs))
        }
      })
    case REMOVE_LAYOUT:
      return state.withMutations(prev => {
        const layouts = prev.getIn([action.taskId, 'lg'])
        const idx = layouts.findIndex(layout => layout.get('i') === action.layoutId)
        if (idx !== -1) {
          prev.removeIn([action.taskId, 'lg', idx])
          prev.removeIn([action.taskId, 'md', idx])
          prev.removeIn([action.taskId, 'sm', idx])
          prev.removeIn([action.taskId, 'xs', idx])
        }
      })
    default:
      return state
  }
}

export default reducer
