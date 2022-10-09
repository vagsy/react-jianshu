import axios from 'axios'
import * as constants from './constants'

const changeLogin = (title, content) => ({
  type: constants.CHANGE_LOGIN,
  value: true
})

export const login = (account, password) => {
  return (dispatch) => {
    axios.get('/api/login.json?account=' + account + '&password=' + password).then((res) => {
      const { data } = res.data
      if (data) {
        dispatch(changeLogin())
      } else {
        alert('登陆失败')
      }
    })
  }
}

export const logout = () => ({
  type: constants.CHANGE_LOGOUT,
  value: false
})
