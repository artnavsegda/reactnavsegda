import React, { Component } from 'react';
import './App.css';

class App extends Component {
  myChangeHandler = (event) => {
    clearTimeout(this.timerID);
    this.timerID = setTimeout((myValue)=>{
      console.log("time out");
      console.log(myValue);

      fetch("https://artnavsegda.herokuapp.com/q?ask=" + myValue)
      .then(response => response.json())
      .then(variants => console.log(variants));

    }, 1000, event.target.value);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form>
            <input type="text" onChange={this.myChangeHandler} />
          </form>
          
        </header>
      </div>
    );
  }
}

export default App;