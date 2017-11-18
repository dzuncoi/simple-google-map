import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react/lib/Spinner';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import '../styles/AddressList.css';
import AddressForm from './AddressForm.component';
import AddressListRow from './AddressListRow.component';
import { downloadCSV } from '../utils/csv';

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
      this.toggleDisplayMode(undefined, 'list');
    }
  }

  onRequestEdit = (id) => {
    this.props.requestEditAddress(id);
    this.toggleDisplayMode(undefined, 'form');
  }

  toggleDisplayMode = (e, mode) => {
    const displayMode = mode || (this.state.displayMode === 'list' ? 'form' : 'list');
    this.setState({
      displayMode,
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

  downloadCSVFile = () => {
    downloadCSV({ arrayOfObjects: this.props.addresses.items });
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
        <DefaultButton
          primary
          text=""
          iconProps={{ iconName: 'MoreVertical' }}
          className="context-btn"
          menuProps={{
            shouldFocusOnMount: true,
            items: [{
              key: 'csv',
              name: 'Export as CSV',
              iconProps: {
                iconName: 'Add',
              },
              onClick: this.downloadCSVFile,
            }],
          }}
        />
        <div className="address-content">
          <div className="list-content">
            {
              addresses.items.map(address => (
                <AddressListRow
                  key={address.dateCreated}
                  address={address}
                  requestEdit={this.onRequestEdit}
                />
              ))
            }
            {
              addresses.loading && (
                <Spinner size={SpinnerSize.large} label="Please wait ..." />
              )
            }
          </div>
          <div className="form-content">
            <AddressForm {...this.props} />
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
  requestEditAddress: PropTypes.func.isRequired,
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
