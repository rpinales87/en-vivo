import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

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
    axios({
      url: `${apiUrl}/events/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
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
    console.log('this.props on eventjs render is: ', this.props)
    console.log('user on event.js is: ', user)
    const { events } = this.state
    console.log('this.state on event.js is: ', this.state)
    console.log('events on event.js is: ', events)
    return (
      <Fragment>
        <ListGroup>
          { user && events.map(event => (
            <ListGroup.Item key={event.id}>
              <span className="h5 d-block">{event.name}</span>
              <span className="d-block">{event.type}</span>
              <span className="d-block">{event.date} at {event.time}</span>
              <span className="d-block">{event.venue}</span>
              <span className="d-block">{event.details}</span>

              { user && event.user.id === user.id && <Link to={'/update-event/' + event.id}>Update Event details</Link> }
              { user && event.user.id === user.id && <Button variant="danger" onClick={() => this.destroy(event.id)}>Cancel event</Button> }
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
