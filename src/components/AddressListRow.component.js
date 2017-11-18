import React from 'react';
import PropTypes from 'prop-types';
import { beautifyAddressTexts } from '../utils/transform';

const AddressListRowComponent = (props) => {
  const {
    address: {
      isNew,
      isUpdated,
      street,
      ward,
      district,
      city,
      id,
    },
  } = props;
  const requestEdit = () => props.requestEdit(id);
  return (
    <div className={`address-item ${(isNew || isUpdated) ? 'flash-bg-anim' : ''}`}>
      <p>{beautifyAddressTexts(street, ward, district, city)}</p>
      <button className="action" onClick={requestEdit}>
        <i className="ms-Icon ms-Icon--EditNote" aria-hidden="true" />
      </button>
    </div>
  );
};

AddressListRowComponent.propTypes = {
  address: PropTypes.shape({
    street: PropTypes.string,
    ward: PropTypes.string,
    district: PropTypes.string,
    city: PropTypes.string,
  }),
  requestEdit: PropTypes.func.isRequired,
};

AddressListRowComponent.defaultProps = {
  address: {},
};

export default AddressListRowComponent;
