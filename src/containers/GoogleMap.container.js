import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import {
  compose,
  withProps,
  lifecycle,
} from 'recompose';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import _get from 'lodash/get';

import { submitNewAddress } from '../redux/reducers/address.reducer';
import { mapGooglePlaceToInput } from '../utils/transform';

const MyGoogleMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentDidMount() {
      // setTimeout(() => {
      //   const geocoder = new google.maps.Geocoder(); // eslint-disable-line
      //   geocoder.geocode({
      //     address: 'Viet Nam',
      //   }, (results, status) => {
      //     if (status === google.maps.GeocoderStatus.OK) { // eslint-disable-line
      //       const center = results[0].geometry.location;
      //       this.setState({ center });
      //       map.setCenter(results[0].geometry.location);
      //       if (marker) {
      //         marker.setMap(null);
      //         if (infowindow) infowindow.close();
      //       }
      //       marker = new google.maps.Marker({
      //         map: map,
      //         draggable: true,
      //         position: results[0].geometry.location
      //       });

      //       eslint-disable-next-line
      //       google.maps.event.addListener(marker, 'dragend', function() {
      //         geocodePosition(marker.getPosition());
      //       });
      //       google.maps.event.addListener(marker, 'click', function() {
      //         if (marker.formatted_address) {
      //           infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
      //         } else {
      //           infowindow.setContent(address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
      //         }
      //         infowindow.open(map, marker);
      //       });
      //       google.maps.event.trigger(marker, 'click');
      //     }
      //   });
      // }, 3000);
    },

    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624,
        },
        markers: [],
        currentPlace: {},
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        isInfoWindowOpen: true,
        toggleInfoWindow: () => {
          console.log('toggle info', this.state);
          this.setState({ isInfoWindowOpen: !this.state.isInfoWindowOpen });
        },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          // eslint-disable-next-line
          const bounds = new google.maps.LatLngBounds();

          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
            formatted_address: place.formatted_address,
          }));
          const nextCenter = _get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
            currentPlace: places[0],
          });

          this.props.onPlaceSet(places);
          // refs.map.fitBounds(bounds);
        },
        addToAddressList: () => {
          const place = mapGooglePlaceToInput(this.state.currentPlace);
          this.props.submitNewAddress(place);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_RIGHT} // eslint-disable-line
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Find your own address here"
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '32px',
          marginTop: '27px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
        }}
      />
    </SearchBox>
    {
      props.markers.map(marker => (
        <Marker
          key={marker.position.lat()}
          position={marker.position}
          onClick={props.toggleInfoWindow}
        >
          { props.isInfoWindowOpen && (
            <InfoWindow onCloseClick={props.toggleInfoWindow}>
              <div className="text-center">
                <p>{marker.formatted_address}</p>
                <PrimaryButton
                  text="Add to list"
                  className="location-btn"
                  onClick={props.addToAddressList}
                />
              </div>
            </InfoWindow>
          ) }
        </Marker>
      ))
    }
  </GoogleMap>
));

MyGoogleMap.propTypes = {
  onPlaceSet: PropTypes.func,
  submitNewAddress: PropTypes.func,
};

const mapDispatchToProps = {
  submitNewAddress,
};

export default connect(null, mapDispatchToProps)(MyGoogleMap);
