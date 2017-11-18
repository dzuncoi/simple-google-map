import React, { Component } from 'react';

import './styles/App.css';
import AddressListContainer from './containers/AddressList.container';
import MyGoogleMap from './containers/GoogleMap.container';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <AddressListContainer />
        <MyGoogleMap />
      </div>
    );
  }
}

export default App;
