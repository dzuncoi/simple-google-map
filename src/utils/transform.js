export const mapGooglePlaceToInput = (place) => {
  const {
    address_components: addresses,
    geometry: {
      location,
    },
  } = place;
  const result = {
    street: '',
    ward: '',
    district: '',
    city: '',
    lat: location.lat(),
    long: location.lng(),
  };
  addresses.forEach(({ types = [], long_name }) => {
    if (types.indexOf('route') >= 0 || types.indexOf('street_number') >= 0) {
      result.street += `${long_name} `;
    } else if (types.indexOf('sublocality_level_1') >= 0) {
      result.ward += long_name;
    } else if (types.indexOf('administrative_area_level_2') >= 0) {
      result.district += long_name;
    } else if (types.indexOf('administrative_area_level_1') >= 0) {
      result.city += long_name;
    }
  });
  return result;
};

export default {
  mapGooglePlaceToInput,
};