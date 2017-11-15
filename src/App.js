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
  }

  componentDidMount() {
    const id = Math.floor(Math.random() * 10000000);
    const ref = firebase.database().ref(`addresses/${id}`);
    ref.set({
      city: 'Ho Chi Minh',
      dataAdded: Date.now(),
    });
    // ref.on('value', (snapshot) => {
    //   console.log(snapshot.val());
    // });
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
