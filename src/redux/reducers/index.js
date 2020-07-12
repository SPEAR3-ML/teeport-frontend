import { combineReducers } from 'redux-immutable'

import layout from './layout'
import plots from './plots'

const reducer = combineReducers({
  layout,
  plots,
})

export default reducer
