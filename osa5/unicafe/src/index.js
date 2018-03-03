import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const Button = ({handleClick, label}) => (
  <button onClick={handleClick}>
    {label}
  </button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const store = createStore(counterReducer)

const Statistics = ({stats}) => {
  const {hyva, neutraali, huono} = stats;

  const keskiarvo = () => (hyva + (huono * -1)) / (hyva + neutraali + huono);

  const positiivisia = () => hyva / (hyva + neutraali + huono) * 100;

  if (hyva + neutraali + huono === 0) {
    return "ei yhtään palautetta annettu"
  }
  return (
    <table>
    <tbody>

    <Statistic text="hyvä" value={hyva} />
    <Statistic text="neutraali" value={neutraali} />
    <Statistic text="huono" value={huono} />
    <Statistic text="keskiarvo" value={keskiarvo()} />
    <Statistic text="positiivisia" value={positiivisia() + " %"} />

    </tbody>
    </table>
  )
}

class App extends React.Component {
  lisaaHyva = () => {
    store.dispatch({ type: 'HYVA' })
  }

  lisaaNeutraali = () => {
    store.dispatch({ type: 'NEUTRAALI' })
  }

  lisaaHuono = () => {
    store.dispatch({ type: 'HUONO' })
  }

  nollaaTilasto = () => {
    store.dispatch({ type: 'NOLLAA' })
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>

        <Button label="hyvä" handleClick={this.lisaaHyva} />
        <Button label="neutraali" handleClick={this.lisaaNeutraali} />
        <Button label="huono" handleClick={this.lisaaHuono} />

        <h1>statistiikka</h1>

        <div>
          <Statistics stats={store.getState()} />
        </div>

        <Button label="nollaa tilasto" handleClick={this.nollaaTilasto} />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)
