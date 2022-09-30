import * as constants from './constants'
import { fromJS } from 'immutable' // js 对象转化为 immutable 对象

const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 1,
  totalPage: 1
})

export default (state = defaultState, action) => {
  // if (action.type === constants.SEARCH_FOCUS) {
  //   // return {
  //   //   focused: true
  //   // }
  //   // immutable 对象的 set 方法，会结合之前 immutable 对象的值和设置的值，返回一个全新的对象
  //   return state.set('focused', true)
  // }

  // if (action.type === constants.SEARCH_BLUR) {
  //   // return {
  //   //   focused: false
  //   // }
  //   return state.set('focused', false)
  // }

  // if (action.type === constants.CHANGE_LIST) {
  //   // return {
  //   //   focused: false
  //   // }
  //   return state.set('list', action.data)
  // }

  // return state

  switch(action.type) {
    case constants.SEARCH_FOCUS:
      return state.set('focused', true)
    case constants.SEARCH_BLUR:
      return state.set('focused', false)
    case constants.CHANGE_LIST:
      // return state.set('list', action.data).set('totalPage', action.totalPage)
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      })
    case constants.MOUSE_ENTER:
      return state.set('mouseIn', true)
    case constants.MOUSE_LEAVE:
      return state.set('mouseIn', false)
    case constants.CHANGE_PAGE:
      return state.set('page', action.page)
    default: 
      return state
  }
}