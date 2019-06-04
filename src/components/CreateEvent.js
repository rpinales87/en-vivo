import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../apiConfig'

class CreateEvent extends Component {
  constructor () {
    super()

    this.state = {
      type: '',
      name: '',
      date: '',
      time: '',
      venue: '',
      details: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/events`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        event: {
          type: this.state.type,
          name: this.state.name,
          date: this.state.date,
          time: this.state.time,
          venue: this.state.venue,
          details: this.state.details
        }
      }
    })
      .then(response => this.setState({
        event: response.data.event
      }))
      .then(() => this.props.alert(`${this.state.name} at ${this.state.venue} has been created!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Something went wrong. Please try again.', 'danger')
        this.setState({
          type: '',
          name: '',
          date: '',
          time: '',
          venue: '',
          details: ''
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    type: '',
    name: '',
    date: '',
    time: '',
    venue: '',
    details: ''
  })

  render () {
    const { type, name, date, time, venue, details } = this.state

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Create Event</h2>
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

export default withRouter(CreateEvent)
