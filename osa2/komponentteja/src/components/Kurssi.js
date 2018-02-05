import React from 'react'

import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const Kurssi = ({kurssi}) => (
  <div>
    <Otsikko nimi={kurssi.nimi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
  </div>
)

const Otsikko = ({nimi}) => (
  <h1>
    {nimi}
  </h1>
)

export default Kurssi
