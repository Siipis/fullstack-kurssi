import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

const Search = ({handleChange, value}) => (
  <div>
    find countries:
    <input value={value}
      onChange={handleChange} />
  </div>
)

const SearchResults = ({handleClick, results}) => (
  <div>
  {
    results.length > 10 ? (
      <NoResults />
    ) : (
      results.length === 1 ? (
        <SingleResult result={results[0]} />
      ) : (
        <ListResults handleClick={handleClick} results={results} />
      )
    )
  }
  </div>
)

const SingleResult = ({result}) => (
  <div>
    <h1>{result.name}</h1>
    <p>capital: {result.capital}</p>
    <p>population: {result.population}</p>
    <img src={result.flag} width="500px" />
  </div>
)

const ListResults = ({handleClick, results}) => (
  <div>
  { results.map(result =>
    <p key={result.name} onClick={handleClick}>{result.name}</p>
  ) }
  </div>
)

const NoResults = () => (
  <div>
    too many matches, specify another filter
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      find: '',
    }
  }

  handleResultClick = (event) => {
    this.setState({
      find: event.target.innerText
    })
  }

  componentDidMount() {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      this.setState({
        countries: response.data
      })
    })
    .catch(error => console.log('Something went wrong: ', error))
  }

  handleSearchChange = (event) => {
    this.setState({
      find: event.target.value
    })
  }

  render() {
    const results =
      this.state.find === '' ?
      this.state.countries :
      this.state.countries.filter(
        c => c.name.toLowerCase().includes(this.state.find.toLowerCase())
      )

    return (
      <div>
        <Search handleChange={this.handleSearchChange} value={this.state.find} />
        <SearchResults results={results} handleClick={this.handleResultClick} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
