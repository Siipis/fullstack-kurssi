import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({kurssi}) => (
  <h1>
    {kurssi.nimi}
  </h1>
)

const Sisalto = ({osat}) => (
  <div>
  {osat.map((item, index) => (
    <p>{item.nimi} {item.tehtavia}</p>
  ))}
  </div>
)

class Yhteensa extends React.Component {
  render() {
    const osat = this.props.osat;

    const summa = () => osat.reduce((total, item) => total + item.tehtavia, 0);

    return (
      <p>
        {summa()} tehtävää
      </p>
    )
  }
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
    <Otsikko kurssi={kurssi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
