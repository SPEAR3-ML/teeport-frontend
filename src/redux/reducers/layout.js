import { fromJS } from 'immutable'

import { UPDATE_LAYOUT } from '../actionTypes'

const initialState = fromJS({
  l0: [],
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUT:
      return state.set('l0', fromJS(action.layout))
    default:
      return state
  }
}

export default reducer
