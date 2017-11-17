export const validateAddressForm = (data) => {
  const {
    street,
    ward,
    district,
    city,
  } = data;
  let isValidated = true;
  let err = null;
  if (!street) {
    err = { street: true };
    isValidated = false;
  } else if (!city) {
    if (!ward) {
      err = { ward: true };
      isValidated = false;
    } else if (!district) {
      err = { district: true };
      isValidated = false;
    }
  }
  return { isValidated, err };
};

export default {
  validateAddressForm,
};
