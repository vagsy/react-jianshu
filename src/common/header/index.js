import React, { Component } from 'react';
// import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';
import { actionCreators }  from './store'
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition,
  Button
} from './style'

// const Header = (props) => {
//   return (
//     <HeaderWrapper>
//       <Logo />
//       <Nav>
//         <NavItem className='left active'>首页</NavItem>
//         <NavItem className='left'>下载App</NavItem>
//         <NavItem className='right'>登陆</NavItem>
//         <NavItem className='right'>
//           <i className='iconfont'>&#xe636;</i>
//         </NavItem>
//         <SearchWrapper>
//           <CSSTransition
//             in={props.focused}
//             timeout={200}
//             classNames='slide'
//           >
//             <NavSearch
//               className={props.focused ? 'focused' : ''}
//               onFocus={props.handleInputFocus}
//               onBlur={props.handleInputBlur}
//             />
//           </CSSTransition>
//           <i className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe614;</i>
//           { getListArea(props.focused) }
//         </SearchWrapper>
//         <Addition>
//           <Button className='writting'><i className='iconfont'>&#xe615;</i>写文章</Button>
//           <Button className='reg'>注册</Button>
//         </Addition>
//       </Nav>
//     </HeaderWrapper>
//   )
// }

// const getListArea = (show) => {
//   if (show) {
//     return (
//       <SearchInfo>
//         <SearchInfoTitle>
//           热门搜索
//           <SearchSwitch>换一批</SearchSwitch>
//         </SearchInfoTitle>
//         <SearchInfoList>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//         </SearchInfoList>
//       </SearchInfo>
//     )
//   } else {
//     return null
//   }
// }

class Header extends Component {

  getListArea() {
    const { focused, mouseIn, list, page, totalPage, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props
    const newList = list.toJS()
    const pageList = []

    if (newList.length) {
      for (let i = ((page - 1) * 10); i < page * 10; i++) {
        if (newList[i]) {
          pageList.push(
            <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
          )
        }
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
              <i ref={(icon) => {this.spinIcon = icon}} className='iconfont spin'>&#xe851;</i>
              换一批
            </SearchSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            { pageList }
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }

  render() {
    const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo />
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          {
            login ?
            <NavItem className='right' onClick={logout}>退出</NavItem> :
            <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
          }
          <NavItem className='right'>
            <i className='iconfont'>&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}
              classNames='slide'
            >
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
              />
            </CSSTransition>
            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe614;</i>
            { this.getListArea() }
          </SearchWrapper>
          <Addition>
            <Link to='/write'>
              <Button className='writting'><i className='iconfont'>&#xe615;</i>写文章</Button>
            </Link>
            <Button className='reg'>注册</Button>
          </Addition>
        </Nav>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    login: state.getIn(['login', 'login'])
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      // const action = {
      //   type: 'search_focus'
      // }
      (list.size === 0) && dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },
  
    handleInputBlur() {
      // const action = {
      //   type: 'search_blur'
      // }
      // dispatch(action)
      dispatch(actionCreators.searchBlur())
    },

    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },

    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },

    handleChangePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
      if (originAngle) {
        originAngle = parseInt(originAngle, 10)
      } else {
        originAngle = 0
      }
      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1))
      } else {
        dispatch(actionCreators.changePage(1))
      }
    },
    logout() {
      dispatch(loginActionCreators.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);
