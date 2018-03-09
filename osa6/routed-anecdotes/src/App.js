import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Nav, Navbar, NavItem, Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap'


const Menu = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        Anecdotes
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem href="/">
          <Link style={{ color: 'inherit' }} to='/'>anecdotes</Link>
        </NavItem>
        <NavItem href="#">
          <Link style={{ color: 'inherit' }} to='/create'>create new</Link>
        </NavItem>
        <NavItem href="#">
          <Link style={{ color: 'inherit' }} to='/about'>about</Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const Notification = ({ notification }) => (
  <p style={{ color: 'green', marginBottom: 20, fontSize: '120%' }}>{notification}</p>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>
  </div>
)

const SingleAnecdote = ({ anecdote }) => (
  <div>
    <h3>{anecdote.content} by {anecdote.author}</h3>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info} target='_blank'>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <div className='row'>
    <div className='col-sm-8'>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
    <div className='col-sm-4'>
      <img className='img-responsive' src='ada_lovelace.jpg' />
    </div>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.setState({
      content: '',
      author: '',
      info: ''
    })

    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="contentField">
            <Col componentClass={ControlLabel} sm={3}>content</Col>
            <Col sm={6}>
              <FormControl
                type="text"
                name="content"
                value={this.state.content}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="authorField">
            <Col componentClass={ControlLabel} sm={3}>author</Col>
            <Col sm={6}>
              <FormControl
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="infoField">
            <Col componentClass={ControlLabel} sm={3}>url for more info</Col>
            <Col sm={6}>
              <FormControl
                type="text"
                name="info"
                value={this.state.info}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={3} sm={6}>
              <Button type="submit">create</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created!`
    })

    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className='container'>
        <h1>Software anecdotes</h1>
          <Router>
            <div>
              <Menu />
              <Notification notification={this.state.notification} />
              <Route exact path='/' render={() =>
                <AnecdoteList anecdotes={this.state.anecdotes} />
              } />
              <Route path='/anecdotes/:id' render={({match}) =>
                <SingleAnecdote anecdote={this.anecdoteById(match.params.id)} />
              } />
              <Route path='/about' render={() =>
                <About />
              } />
              <Route path='/create' render={({history}) =>
                <CreateNew history={history} addNew={this.addNew}/>
              } />
            </div>
          </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
