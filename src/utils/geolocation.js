import { mapGooglePlaceToInput } from './transform';

// eslint-disable-next-line
export const grantUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// eslint-disable-next-line
export const getAddressFromLocation = ({ latitude, longitude }) => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder; // eslint-disable-line
    const latlng = { lat: latitude, lng: longitude };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = mapGooglePlaceToInput(results[0]);
        return resolve(location);
      }
      return reject(new Error('No Address'));
    });
  });
};

export default {
  grantUserLocation,
};
