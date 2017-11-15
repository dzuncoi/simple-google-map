import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Welcome to React',
    };
    console.log(firebase);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.header}</h1>
        </header>
      </div>
    );
  }
}

export default App;
