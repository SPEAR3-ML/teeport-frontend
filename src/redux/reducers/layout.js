import { fromJS } from 'immutable'

import { UPDATE_LAYOUT } from '../actionTypes'

const initialState = fromJS({
  l0: [
    { i: '1', x: 0, y: 0, w: 6, h: 12, minW: 3, maxW: 12, minH: 8, maxH: 24 },
    { i: '2', x: 6, y: 0, w: 6, h: 12, minW: 3, maxW: 12, minH: 8, maxH: 24 },
    { i: '3', x: 0, y: 12, w: 6, h: 12, minW: 3, maxW: 12, minH: 8, maxH: 24 },
  ],
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
