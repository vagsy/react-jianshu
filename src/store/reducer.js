import { combineReducers } from 'redux-immutable'
import { reducer as heaReducer } from '../common/header/store'
import { reducer as homeReducer  } from '../pages/home/store'

const reducer = combineReducers({
  header: heaReducer,
  home: homeReducer
})

export default reducer