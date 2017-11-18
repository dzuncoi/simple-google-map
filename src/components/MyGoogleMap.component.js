/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import _get from 'lodash/get';

import { mapGooglePlaceToInput } from '../utils/transform';

class MyGoogleMapComponent extends Component {
  constructor(props) {
    super(props);
    this.myRefs = {};
    this.state = {
      bounds: null,
      center: {
        lat: 10.7863854,
        lng: 106.7050573,
      },
      markers: [],
      places: [],
    };
  }

  onMapMounted = (ref) => {
    this.myRefs.map = ref;
  }

  onBoundsChanged = () => {
    this.setState({
      bounds: this.myRefs.map.getBounds(),
      center: this.myRefs.map.getCenter(),
    });
  }

  onSearchBoxMounted = (ref) => {
    this.myRefs.searchBox = ref;
  }

  onPlacesChanged = () => {
    const places = this.myRefs.searchBox.getPlaces();

    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    const nextMarkers = places.map((place, index) => ({
      position: place.geometry.location,
      formatted_address: place.formatted_address,
      isInfoWindowOpen: index === 0,
    }));
    const nextCenter = _get(nextMarkers, '0.position', this.state.center);

    this.setState({
      center: nextCenter,
      markers: nextMarkers,
      places,
    });

    // this.props.onPlaceSet(places);
    // refs.map.fitBounds(bounds);
  }

  toggleInfoWindow = index => () => {
    // Toggle active marker, close remaining ones
    const newMarkers = this.state.markers.map((marker, i) => ({
      ...marker,
      isInfoWindowOpen: (index === i) ? !marker.isInfoWindowOpen : false,
    }));
    this.setState({
      markers: newMarkers,
    });
  }

  addToAddressList = index => () => {
    const place = mapGooglePlaceToInput(this.state.places[index]);
    this.props.submitNewAddress(place);
  }

  render() {
    return (
      <GoogleMap
        ref={this.onMapMounted}
        defaultZoom={15}
        center={this.state.center}
        onBoundsChanged={this.onBoundsChanged}
      >
        <SearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_RIGHT} // eslint-disable-line
          onPlacesChanged={this.onPlacesChanged}
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
          this.state.markers.map((marker, index) => (
            <Marker
              key={marker.position.lat()}
              position={marker.position}
              onClick={this.toggleInfoWindow(index)}
            >
              { marker.isInfoWindowOpen && (
                <InfoWindow onCloseClick={this.toggleInfoWindow(index)}>
                  <div className="text-center">
                    <p>{marker.formatted_address}</p>
                    <PrimaryButton
                      text="Add to list"
                      className="location-btn"
                      onClick={this.addToAddressList(index)}
                    />
                  </div>
                </InfoWindow>
              ) }
            </Marker>
          ))
        }
      </GoogleMap>
    );
  }
}

MyGoogleMapComponent.propTypes = {
  submitNewAddress: PropTypes.func.isRequired,
};

export default MyGoogleMapComponent;
