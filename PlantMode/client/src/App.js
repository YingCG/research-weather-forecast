import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/weathers").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {/* {data.weathers} */}
      {(typeof data.weathers === 'undefined') ? (
        <p>Loading...</p>
      ): (
        data.weathers.map((waterlevel, i) => (
          <p key={i}>{waterlevel}</p>
        ))
      )}
    </div>
  )
}

export default App
