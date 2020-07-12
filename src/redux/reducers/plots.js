import { fromJS } from 'immutable'

import { UPDATE_PLOTS, REFRESH_PLOT, ADD_PLOT, REMOVE_PLOT } from '../actionTypes'

const initialState = fromJS({})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLOTS:
      return state.set(action.taskId, fromJS(action.plots))
    case REFRESH_PLOT:
      return state.updateIn([action.taskId, action.i, 'revision'], r => r + 1)
    case ADD_PLOT:
      return state.withMutations(prev => {
        const plots = prev.get(action.taskId)
        prev.setIn([action.taskId, plots.size], fromJS(action.plot))
      })
    case REMOVE_PLOT:
      return state.removeIn([action.taskId, action.i])
    default:
      return state
  }
}

export default reducer
