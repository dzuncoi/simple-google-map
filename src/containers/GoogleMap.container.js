import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

import MyGoogleMapComponent from '../components/MyGoogleMap.component';
import { submitNewAddress } from '../redux/reducers/address.reducer';

const MyGoogleMapContainer = props => (<MyGoogleMapComponent {...props} />);

MyGoogleMapContainer.propTypes = {
  submitNewAddress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  submitNewAddress,
};

const HOCGoogleMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <MyGoogleMapContainer {...props} />
));

export default connect(null, mapDispatchToProps)(HOCGoogleMap);
