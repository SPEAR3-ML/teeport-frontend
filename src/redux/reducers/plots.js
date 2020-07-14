import { fromJS } from 'immutable'

import { UPDATE_PLOTS, REFRESH_PLOT, ADD_PLOT, REMOVE_PLOT } from '../actionTypes'

const initialState = fromJS({})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLOTS:
      return state.set(action.taskId, fromJS(action.plots))
    case REFRESH_PLOT:
      return state.withMutations(prev => {
        const plots = prev.get(action.taskId)
        const idx = plots.findIndex(plot => plot.get('title') === action.plotId)
        if (idx !== -1) {
          prev.updateIn([action.taskId, idx, 'revision'], r => r + 1)
        }
      })
    case ADD_PLOT:
      return state.withMutations(prev => {
        const plots = prev.get(action.taskId)
        const idx = plots.findIndex(plot => plot.get('title') === action.plot.title)
        if (idx === -1) {
          prev.setIn([action.taskId, plots.size], fromJS(action.plot))
        }
      })
    case REMOVE_PLOT:
      return state.withMutations(prev => {
        const plots = prev.get(action.taskId)
        const idx = plots.findIndex(plot => plot.get('title') === action.plotId)
        if (idx !== -1) {
          prev.removeIn([action.taskId, idx])
        }
      })
    default:
      return state
  }
}

export default reducer
