import { combineReducers } from 'redux-immutable'

import layout from './layout'
import tmp from './tmp'

const reducer = combineReducers({
  layout,
  tmp,
})

export default reducer
