import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'

class Events extends Component {
  constructor () {
    super()

    this.state = {
      events: [],
      edit: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/events`)
      .then(res => {
        this.setState({ events: res.data.events })
      })
      .catch(console.error)
  }

  destroy = id => {
    axios.delete(`${apiUrl}/events/${id}`)
      .then(() => this.props.alert('Event deleted!', 'success'))
      .then(() => {
        axios(`${apiUrl}/events`)
          .then(res => {
            this.setState({ events: res.data.events })
          })
          .catch(console.error)
      })
      .catch(console.error)
  }

  render () {
    const { user } = this.props
    const { events } = this.state

    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Events</h3>
          {!user && <p className="m-0">Sign in to add/edit events</p>}
          {user && <Button variant="success" href="#create-event">Create Event</Button>}
        </div>
        <ListGroup>
          { user && events.map(event => (
            <ListGroup.Item key={event.id} action>
              <span className="h5 d-block">{event.name}</span>
              <span className="d-block">{event.type}</span>
              <span className="d-block">{event.date} at {event.time}</span>
              <span className="d-block">{event.venue}</span>
              <span className="d-block">{event.details}</span>

              <Button variant="danger" onClick={() => this.destroy(event.id)}>Cancel event</Button>
            </ListGroup.Item>
          )) }
          { !user && events.map(event => (
            <ListGroup.Item key={event.id}>
              <span className="h5 d-block">{event.name}</span>
              <span className="d-block">{event.type}</span>
              <span className="d-block">{event.date} at {event.time}</span>
              <span className="d-block">{event.venue}</span>
              <span className="d-block">{event.details}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default Events
