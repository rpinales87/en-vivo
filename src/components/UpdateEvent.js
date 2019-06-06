import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import apiUrl from '../apiConfig'

class UpdateEvent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      event: {
        type: '',
        name: '',
        date: '',
        time: '',
        venue: '',
        details: ''
      },
      updated: false
    }
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const updatedEvent = Object.assign(this.state.event, updatedField)

    this.setState({ event: updatedEvent })
  }

    handleSubmit = event => {
      event.preventDefault()
      axios({
        url: `${apiUrl}/events/${this.props.match.params.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          event: this.state.event
        }
      })
        .then(res => {
          this.setState({ updated: true })
        })
        .then(() => this.props.history.push('/my-events'))
        .catch(console.error)
    }

    render () {
      const { type, name, date, time, venue, details } = this.state

      return (
        <Form className="form" onSubmit={this.handleSubmit}>
          <h2>Update Event</h2>
          <Form.Group controlId="type">
            <Form.Label>Event type</Form.Label>
            <Form.Control
              type="text"
              value={type}
              name="type"
              required
              onChange={this.handleChange}
              placeholder="Event type: Concert, festival, etc..."
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={name}
              name="name"
              required
              placeholder="Event name"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              name="date"
              required
              placeholder="Event date"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="time">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={time}
              name="time"
              required
              placeholder="Start Time"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="venue">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={venue}
              name="venue"
              required
              placeholder="Location name"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="details">
            <Form.Label>Additional info</Form.Label>
            <div>
              <textarea
                row='4'
                col='20'
                type="text"
                value={details}
                name="details"
                placeholder="Optional"
                onChange={this.handleChange}
              />
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="m-1"
          >
              Submit
          </Button>
          <Button
            variant="danger"
            type="button"
            className="m-1"
            onClick={this.resetForm}
          >
              Reset
          </Button>
        </Form>
      )
    }
}

export default withRouter(UpdateEvent)
