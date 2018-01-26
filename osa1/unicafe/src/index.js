import React from 'react'
import ReactDOM from 'react-dom'

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
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  lisaaHyva = () => {
    console.log("lisätty hyvä")

    this.setState({ hyva: this.state.hyva + 1 })
  }

  lisaaNeutraali = () => {
    this.setState({ neutraali: this.state.neutraali + 1 })
  }

  lisaaHuono = () => {
    this.setState({ huono: this.state.huono + 1 })
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>

        <Button label="hyvä" handleClick={this.lisaaHyva} />
        <Button label="neutraali" handleClick={this.lisaaNeutraali} />
        <Button label="huono" handleClick={this.lisaaHuono} />

        <h1>statistiikka</h1>

        <Statistics stats={this.state} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
