import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react/lib/Spinner';
import { List } from 'office-ui-fabric-react/lib/List';

import '../styles/AddressList.css';
import AddressForm from './AddressForm.component';
// import { createNewAddress } from '../firebase/controllers/address.controller';

class AddressListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMode: 'list',
    };
  }

  onSubmitAddress = (data) => {
    this.props.submitNewAddress(data);
  }

  toggleDisplayMode = () => {
    this.setState({
      displayMode: this.state.displayMode === 'list' ? 'form' : 'list',
    });
  }

  renderRow = (address) => {
    const {
      street, ward, district, city,
    } = address;
    return (
      <div className="address-item">
        <p>{`${street}, ${ward}, ${district}, ${city}`}</p>
        <div className="action">
          <i className="ms-Icon ms-Icon--EditNote" aria-hidden="true" />
        </div>
      </div>
    );
  }

  render() {
    const { addresses } = this.props;
    const { displayMode } = this.state;
    return (
      <div className={`address-list-container ${displayMode} ms-slideRightIn40`}>
        <h3>Address List</h3>
        <button className="float-btn" onClick={this.toggleDisplayMode}>
          <i className="ms-Icon ms-Icon--Add" aria-hidden="true" />
          <i className="ms-Icon ms-Icon--Back" aria-hidden="true" />
        </button>
        <div className="address-content">
          <div className="list-content">
            <List
              items={addresses.items}
              onRenderCell={this.renderRow}
            />
            {
              addresses.loading && (
                <Spinner size={SpinnerSize.large} label="Please wait ..." />
              )
            }
          </div>
          <div className="form-content">
            <AddressForm
              {...this.props}
              submitAddress={this.onSubmitAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}

AddressListComponent.propTypes = {
  addresses: PropTypes.shape({
    loading: PropTypes.bool,
    items: PropTypes.array,
    form: PropTypes.shape({
      submitting: PropTypes.bool,
      error: PropTypes.any,
    }),
  }),
  submitNewAddress: PropTypes.func.isRequired,
};

AddressListComponent.defaultProps = {
  addresses: {
    loading: false,
    items: [],
    form: {
      submitting: false,
      error: null,
    },
  },
};

export default AddressListComponent;
