import axios from 'axios'
import * as constants from './constants'
// import { fromJS } from 'immutable'

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
})

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json?id='+id).then((res) => {
      const { title, content } = res.data.data
      const action = changeDetail(title, content)
      dispatch(action)
    })
  }
}