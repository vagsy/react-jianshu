import * as constants from './constants'
import { fromJS } from 'immutable' // js 对象转化为 immutable 对象

const defaultState = fromJS({
  login: false
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_LOGIN:
      return state.set('login', action.value)
    case constants.CHANGE_LOGOUT:
      return state.set('login', action.value)
    default: 
      return state
  }
}