import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/App.css';
import AddressListContainer from './containers/AddressList.container';
import { downloadCSV } from './utils/csv';
import MyGoogleMap from './containers/GoogleMap.container';
import { mapGooglePlaceToInput } from './utils/transform';

class App extends Component {
  componentDidMount() {
  }

  onPlaceSet = (places) => {
    const r = mapGooglePlaceToInput(places[0]);
    console.log(places, r);
  }

  downloadCSVFile = () => {
    downloadCSV({ arrayOfObjects: this.props.addresses.items });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.downloadCSVFile}>Download CSV</button>
        <AddressListContainer />
        <MyGoogleMap onPlaceSet={this.onPlaceSet} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addresses: state.address,
});

App.propTypes = {
  addresses: PropTypes.shape({
    items: PropTypes.array,
    loading: PropTypes.bool,
  }),
};

App.defaultProps = {
  addresses: {
    items: [],
    loading: false,
  },
};

export default connect(mapStateToProps)(App);
