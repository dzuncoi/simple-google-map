import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddressListComponent from '../components/AddressList.component';
import {
  getAddressList,
  submitNewAddress,
  requestEditAddress,
  discardEditAddress,
  updateExistAddress,
} from '../redux/reducers/address.reducer';
import { edittingAddressSelector } from '../redux/reducers/address.selector';

class AddressListContainer extends Component {
  componentWillMount() {
  }

  componentDidMount() {
    this.props.getAddressList();
  }

  render() {
    return <AddressListComponent {...this.props} />;
  }
}

const mapStateToProps = state => ({
  addresses: state.address,
  edittingAddress: edittingAddressSelector(state),
});

const mapDispatchToProps = {
  getAddressList,
  submitNewAddress,
  requestEditAddress,
  discardEditAddress,
  updateExistAddress,
};

AddressListContainer.propTypes = {
  addresses: PropTypes.shape({
    loading: PropTypes.bool,
    items: PropTypes.array,
    form: PropTypes.shape({
      submitting: PropTypes.bool,
      error: PropTypes.any,
    }),
    edittingItemId: PropTypes.string,
  }),
  edittingAddress: PropTypes.object,
  getAddressList: PropTypes.func.isRequired,
  submitNewAddress: PropTypes.func.isRequired,
  requestEditAddress: PropTypes.func.isRequired,
  discardEditAddress: PropTypes.func.isRequired,
  updateExistAddress: PropTypes.func.isRequired,
};

AddressListContainer.defaultProps = {
  addresses: {
    loading: false,
    items: [],
    form: {
      submitting: false,
      error: null,
    },
    edittingItemId: null,
  },
  edittingAddress: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressListContainer);
