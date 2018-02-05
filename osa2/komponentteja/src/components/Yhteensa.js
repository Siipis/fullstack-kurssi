import React from 'react'

const Yhteensa = ({osat}) => {
  const summa = () => osat.reduce((total, item) => total + item.tehtavia, 0);

  return (
    <p>
      {summa()} tehtävää
    </p>
  )
}

export default Yhteensa
