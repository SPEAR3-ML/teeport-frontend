import { fromJS } from 'immutable'

import { INCREASE_COUNT } from '../actionTypes'

const initialState = fromJS({
  count: 0,
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_COUNT:
      return state.update('count', count => count + 1)
    default:
      return state
  }
}

export default reducer
