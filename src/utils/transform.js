/**
 * Convert result from google map to form input format
 * @param {Object} place - response from google map
 * Case 1: contains `address_components`: map each component into form fields
 * Case 2: NOT contains `address_components`:
 * split `formatted_address` into 2 fields only: street name + city (split by the sub last ',')
 */
export const mapGooglePlaceToInput = (place) => {
  const {
    address_components: addresses,
    formatted_address,
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
  if (addresses) {
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
  } else if (formatted_address) {
    const splitted = formatted_address.split(',');
    // Last element is always country (NOT USE this field)
    splitted.pop();
    result.street += splitted.slice(0, splitted.length - 1).join();
    result.city += splitted[splitted.length - 1];
  }
  return result;
};

export const beautifyAddressTexts = (...args) => {
  let result = '';
  for (let i = 0; i < args.length; i++) {
    let r = '';
    if (args[i]) {
      r = i === args.length - 1 ? args[i] : `${args[i]}, `;
    }
    result += r;
  }
  return result;
};

export default {
  mapGooglePlaceToInput,
  beautifyAddressTexts,
};
