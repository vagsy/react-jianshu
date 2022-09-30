// import * as constants from './constants'
import { fromJS } from 'immutable' // js 对象转化为 immutable 对象

const defaultState = fromJS({
  topicList: [{
    id: 1,
    title: '社会热点'
  },{
    id: 2,
    title: '手绘'
  }],
  articleList: [{
      id: 1,
      title: '65766876',
      desc: '867868687',
      imgUrl: ''
    },{
      id: 2,
      title: '65766876',
      desc: '867868687',
      imgUrl: ''
    },{
      id: 3,
      title: '65766876',
      desc: '867868687',
      imgUrl: ''
    }
  ],
  recommentList: [{
    id: 1,
    imgUrl: "images/banner-s-daily.png"
  },{
    id: 2,
    imgUrl: "images/banner-s-club.png"
  }]
})

export default (state = defaultState, action) => {
  switch(action.type) {
    // case constants.SEARCH_FOCUS:
    //   return state.set('focused', true)
    default: 
      return state
  }
}