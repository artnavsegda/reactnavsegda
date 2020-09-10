import React, { useState } from 'react'
import './App.css'

function App() {
  const [timerID, setTimerId] = useState(0)
  const [suggestions, setSuggestions] = useState("suggestions")
  const [status, setStatus] = useState("ready")

  return (
    <div className="App">
      <header className="App-header">
        <form>
        <div>{status}</div>
          <input type="text" onChange={(event)=>{
            clearTimeout(timerID)
            setStatus("loading")
            setTimerId(setTimeout((askValue) => {
              fetch("https://artnavsegda.herokuapp.com/q?ask=" + askValue)
              .then(response => {
                if (!response.ok)
                  throw new Error("connect failure")
                response.json()
              })
              .then(variants => {
                setSuggestions(variants.toString())
                setStatus("loaded")
              })
              .catch(error => {
                setStatus('error: ' + error);
            })
            }, 1000, event.target.value))
          }} />
        </form>
        <div>{suggestions}</div>
      </header>
    </div>
  );
}

export default App;