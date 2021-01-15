import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import { useInitAuth } from './hooks/useInitAuth'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const { init } = useInitAuth()

  if (init) return <div>Loading...</div>

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute exact path="/register">
          <Register />
        </PublicRoute>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
