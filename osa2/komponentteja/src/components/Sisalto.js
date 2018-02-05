import React from 'react'

const Sisalto = ({osat}) => (
  <div>
  {osat.map(osa =>
    <Osa key={osa.id} osa={osa} />
  )}
  </div>
)

const Osa = ({osa}) => (
  <p>{osa.nimi} {osa.tehtavia}</p>
)

export default Sisalto
