import React from 'react'
import { GlobalStyled } from './style'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './common/header'
import Home from './pages/home'
import Detail from './pages/detail'

const App = () => {
  return (
    <div>
      <GlobalStyled />
      <Header />
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Home}></Route>
          <Route path='/detail' exact component={Detail}></Route>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App