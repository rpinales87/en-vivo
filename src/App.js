import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './components-shared/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Events from './components/Events'
import CreateEvent from './components/CreateEvent'
import UpdateEvent from './components/UpdateEvent'
import MyEvents from './components/MyEvents'

import AutoDismissAlert from './components-shared/AutoDismissAlert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            alert={alert}
            variant={alert.type}>
            {alert.message}
          </AutoDismissAlert>
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Events alert={this.alert} user={user} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/create-event' render={() => (
            <CreateEvent alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/my-events' render={() => (
            <MyEvents alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-event/:id' render={() => (
            <UpdateEvent alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
