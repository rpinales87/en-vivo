import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class MyEvents extends Component {
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
      .catch(() => {
        alert('Something went wrong, please try again', 'danger')
      })
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
    const { events } = this.state
    return (
      <Fragment>
        <ListGroup>
          { user && events.filter(function (event) {
            return event.user.id === user.id
          }).map(event => (
            <ListGroup.Item key={event.id}>
              <p>{event.venue} presents:</p>
              <span className="h5 d-block">{event.name}</span>
              <span className="d-block">{event.type}</span>
              <span className="d-block">{event.date} at {event.time}</span>
              <span className="d-block">{event.venue}</span>
              <span className="d-block">{event.details}</span>

              <Link to={'/update-event/' + event.id}>Update Event details</Link>
              <Button variant="danger" onClick={() => this.destroy(event.id)}>Cancel event</Button>
            </ListGroup.Item>
          )) }
        </ListGroup>
      </Fragment>
    )
  }
}

export default MyEvents
