import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react/lib/Spinner';
import _keys from 'lodash/keys';

import { grantUserLocation, getAddressFromLocation } from '../utils/geolocation';
import { validateAddressForm } from '../utils/validation';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      formValue: {
        street: '',
        ward: '',
        district: '',
        city: '',
        lat: null,
        long: null,
      },
      formError: {
        street: false,
        streetText: 'Please fill out street',
        ward: false,
        wardText: 'Please fill out ward',
        district: false,
        districtText: 'Please fill out district',
      },
    };
    this.state = this.initialState;
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.addresses.form.submitting && !nextProps.addresses.form.submitting) {
      this.resetForm();
    }
  }

  onInputChange = name => (val) => {
    this.setState({
      formValue: {
        ...this.state.formValue,
        [name]: val,
      },
    });
  }

  getUserLocation = () => {
    grantUserLocation()
      .then(pos => getAddressFromLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }))
      .then(location => this.applyUserLocationToAddressForm(location))
      .catch(err => console.log(err));
  }

  applyUserLocationToAddressForm = (location) => {
    this.setState({
      formValue: {
        ...this.state.formValue,
        ...location,
      },
    });
  }

  resetForm = () => {
    this.setState({
      formError: this.initialState.formError,
      formValue: this.initialState.formValue,
    });
  }

  handleSubmit = ($event) => {
    $event.preventDefault();
    const r = validateAddressForm(this.state.formValue);
    console.log(r);
    if (!r.isValidated) {
      this.setState({
        formError: {
          ...this.state.formError,
          ...this.initialState.formError, // reset remain error validation
          ...r.err,
        },
      });
    } else {
      this.setState({
        formError: {
          ...this.state.formError,
          ward: false,
          district: false,
          street: false,
        },
      });
      this.props.submitAddress(this.state.formValue);
    }
  }

  render() {
    const { formError } = this.state;
    const {
      addresses: {
        form,
      },
    } = this.props;
    return (
      <div className="ms-Grid address-form">
        <form onSubmit={this.handleSubmit}>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
              <TextField
                label="Street"
                placeholder="Street."
                ariaLabel="Please enter text here"
                required
                errorMessage={formError.street ? formError.streetText : ''}
                value={this.state.formValue.street}
                onChanged={this.onInputChange('street')}
              />
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
              <TextField
                label="Ward"
                placeholder="Ward"
                ariaLabel="Please enter text here"
                value={this.state.formValue.ward}
                onChanged={this.onInputChange('ward')}
                errorMessage={formError.ward ? formError.wardText : ''}
              />
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
              <TextField
                label="District"
                placeholder="District"
                ariaLabel="Please enter text here"
                value={this.state.formValue.district}
                onChanged={this.onInputChange('district')}
                errorMessage={formError.district ? formError.districtText : ''}
              />
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
              <TextField
                label="City"
                placeholder="City"
                ariaLabel="Please enter text here"
                value={this.state.formValue.city}
                onChanged={this.onInputChange('city')}
              />
            </div>
          </div>
          <input type="submit" value="Submit" />
          <div className="submit-area">
            {
              form.submitting ?
                <Spinner size={SpinnerSize.large} />
                :
                <div>
                  <DefaultButton
                    primary
                    text="Create"
                    onClick={this.handleSubmit}
                  />
                  <DefaultButton
                    text="Use your location"
                    className="location-btn"
                    onClick={this.getUserLocation}
                  />
                </div>
            }
          </div>
        </form>
      </div>
    );
  }
}

AddressForm.propTypes = {
  submitAddress: PropTypes.func.isRequired,
  addresses: PropTypes.shape({
    form: PropTypes.shape({
      submitting: PropTypes.bool,
      error: PropTypes.any,
    }),
  }),
};

AddressForm.defaultProps = {
  addresses: {
    form: {
      submitting: false,
      error: null,
    },
  },
};

export default AddressForm;
