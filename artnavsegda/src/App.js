import React, { useState } from 'react';
import './App.css';

function App() {
  const [timerID, setTimerId] = useState(0);
  const [suggestions, setSuggestions] = useState("suggestions");

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input type="text" onChange={(event)=>{
            clearTimeout(timerID)
            setTimerId(setTimeout((askValue) => {
              fetch("https://artnavsegda.herokuapp.com/q?ask=" + askValue)
              .then(response => response.json())
              .then(variants => setSuggestions(variants.toString()))
            }, 1000, event.target.value))
          }} /><label>loading</label>
        </form>
        <div>{suggestions}</div>
      </header>
    </div>
  );
}

export default App;