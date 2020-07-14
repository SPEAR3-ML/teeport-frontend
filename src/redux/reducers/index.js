import { combineReducers } from 'redux-immutable'

import layouts from './layouts'
import plots from './plots'

const reducer = combineReducers({
  layouts,
  plots,
})

export default reducer
