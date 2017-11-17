import React from 'react';
import PropTypes from 'prop-types';

const AddressListRowComponent = (props) => {
  const {
    address: {
      isNew,
      street,
      ward,
      district,
      city,
    },
  } = props;
  return (
    <div className={`address-item ${isNew ? 'flash-bg-anim' : ''}`}>
      <p>{`${street}, ${ward}, ${district}, ${city}`}</p>
      <div className="action">
        <i className="ms-Icon ms-Icon--EditNote" aria-hidden="true" />
      </div>
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
};

AddressListRowComponent.defaultProps = {
  address: {},
};

export default AddressListRowComponent;
