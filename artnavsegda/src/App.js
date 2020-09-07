import React, { Component } from 'react';
import './App.css';

class App extends Component {
  myChangeHandler = (event) => {
    console.log(event.target.value);
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