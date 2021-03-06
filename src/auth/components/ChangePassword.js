import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import { changePassword } from '../api'
import messages from '../messages'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(() => {
        alert(messages.changePasswordFailure, 'danger')
        this.setState({ oldPassword: '', newPassword: '' })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <form className='form' onSubmit={this.onChangePassword}>
        <h3>Change Password</h3>

        <label htmlFor="oldpw">Old Password</label>
        <input
          required
          name="oldPassword"
          value={oldPassword}
          type="password"
          placeholder="Old Password"
          onChange={this.handleChange}
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          required
          name="newPassword"
          value={newPassword}
          type="password"
          placeholder="New Password"
          onChange={this.handleChange}
        />
        <Button type="submit">Change Password</Button>
      </form>
    )
  }
}

export default withRouter(ChangePassword)
