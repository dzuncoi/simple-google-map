import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import _get from 'lodash/get';

const MyGoogleMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentDidMount() {
      setTimeout(() => {
        const geocoder = new google.maps.Geocoder(); // eslint-disable-line
        geocoder.geocode({
          address: 'Viet Nam',
        }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) { // eslint-disable-line
            const center = results[0].geometry.location;
            this.setState({ center });
            // map.setCenter(results[0].geometry.location);
            // if (marker) {
            //   marker.setMap(null);
            //   if (infowindow) infowindow.close();
            // }
            // marker = new google.maps.Marker({
            //   map: map,
            //   draggable: true,
            //   position: results[0].geometry.location
            // });

            // eslint-disable-next-line
            // google.maps.event.addListener(marker, 'dragend', function() {
            //   geocodePosition(marker.getPosition());
            // });
            // google.maps.event.addListener(marker, 'click', function() {
            //   if (marker.formatted_address) {
            //     infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
            //   } else {
            //     infowindow.setContent(address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
            //   }
            //   infowindow.open(map, marker);
            // });
            // google.maps.event.trigger(marker, 'click');
          }
        });
      }, 3000);
    },

    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624,
        },
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
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
          }));
          const nextCenter = _get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });

          this.props.onPlaceSet(places);
          // refs.map.fitBounds(bounds);
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
      controlPosition={google.maps.ControlPosition.TOP_LEFT} // eslint-disable-line
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
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
    {props.markers.map(marker =>
      <Marker key={marker.position.lat()} position={marker.position} />)}
  </GoogleMap>
));

MyGoogleMap.propTypes = {
  onPlaceSet: PropTypes.func,
};

export default MyGoogleMap;
