import { fromJS } from 'immutable'

import { UPDATE_LAYOUT } from '../actionTypes'

const initialState = fromJS({})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUT:
      return state.set(action.taskId, fromJS(action.layout))
    default:
      return state
  }
}

export default reducer
