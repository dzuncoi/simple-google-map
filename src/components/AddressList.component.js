import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react/lib/Spinner';
// import { List } from 'office-ui-fabric-react/lib/List';

import '../styles/AddressList.css';
import AddressForm from './AddressForm.component';
import AddressListRow from './AddressListRow.component';
// import { createNewAddress } from '../firebase/controllers/address.controller';

class AddressListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMode: 'list',
      isCollapsed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Back to list if submit success
    if (this.isSubmitFormSuccess(nextProps, this.props)) {
      this.toggleDisplayMode();
    }
  }

  onSubmitAddress = (data) => {
    this.props.submitNewAddress(data);
  }

  toggleDisplayMode = () => {
    this.setState({
      displayMode: this.state.displayMode === 'list' ? 'form' : 'list',
    });
  }

  isSubmitFormSuccess = (nextProps, props) => {
    const { form } = props.addresses;
    const { form: nextForm } = nextProps.addresses;
    if (form.submitting && !nextForm.submitting && !nextForm.error) {
      return true;
    }
    return false;
  }

  renderRow = address => (
    <AddressListRow address={address} />
  )

  render() {
    const { addresses } = this.props;
    const { displayMode, isCollapsed } = this.state;
    return (
      <div className={`address-list-container ${displayMode} ${isCollapsed ? 'collapsed' : ''} ms-slideRightIn40`}>
        <h3>Address List</h3>
        <button className="float-btn" onClick={this.toggleDisplayMode}>
          <i className="ms-Icon ms-Icon--Add" aria-hidden="true" />
          <i className="ms-Icon ms-Icon--Back" aria-hidden="true" />
        </button>
        <button className="collapse-btn">
          <i className="ms-Icon ms-Icon--ChevronLeftMed" aria-hidden="true" />
        </button>
        <div className="address-content">
          <div className="list-content">
            {
              addresses.items.map(address => <AddressListRow key={address.dateCreated} address={address} />)
            }
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
