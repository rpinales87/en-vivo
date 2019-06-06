import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Carousel from 'react-bootstrap/Carousel'
// import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom'
import './Events.scss'

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
      .catch(() => {
        alert('Something went wrong, please try again', 'danger')
      })
  }

  render () {
    const { user } = this.props
    const { events } = this.state
    return (
      <Fragment>
        <ListGroup>
          { user && events.map(event => (
            <ListGroup.Item key={event.id}>
              <p>{event.venue} presents:</p>
              <span className="h5 d-block">{event.name}</span>
              <span className="d-block">{event.type}</span>
              <span className="d-block">{event.date} at {event.time}</span>
              <span className="d-block">{event.venue}</span>
              <span className="d-block">{event.details}</span>
            </ListGroup.Item>
          ))}
          { !user &&
            <Carousel className="carousel">
              <Carousel.Item>
                <img
                  className="img-responsive d-block"
                  width={1200}
                  height={500}
                  src={require('./carousel1.jpeg')}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>“One good thing about music, when it hits you, you feel no pain.”</h3>
                  <p>― Bob Marley</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-responsive d-block"
                  width={1200}
                  height={500}
                  src={require('./carousel2.jpeg')}
                  alt="second slide"
                />

                <Carousel.Caption>
                  <h3>“I can chase you, and I can catch you, but there is nothing
                  I can do to make you mine.”</h3>
                  <p>― Morrissey</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-responsive d-block"
                  width={1200}
                  height={500}
                  src={require('./carousel3.jpeg')}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>“Music gives a soul to the universe, wings to the mind,
                  flight to the imagination and life to everything.”</h3>
                  <p>― Plato</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          }
          { !user && events.map(event => (
            <ListGroup.Item key={event.id}>
              <p>{event.venue} presents:</p>
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
