import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/App.css';
import AddressListContainer from './containers/AddressList.container';
import { downloadCSV } from './utils/csv';
import MyGoogleMap from './containers/GoogleMap.container';

class App extends Component {
  componentDidMount() {
  }

  downloadCSVFile = () => {
    downloadCSV({ arrayOfObjects: this.props.addresses.items });
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
