import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddressListComponent from '../components/AddressList.component';
import { getAddressList, submitNewAddress } from '../redux/reducers/address.reducer';

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
});

const mapDispatchToProps = {
  getAddressList,
  submitNewAddress,
};

AddressListContainer.propTypes = {
  addresses: PropTypes.shape({
    loading: PropTypes.bool,
    items: PropTypes.array,
    form: PropTypes.shape({
      submitting: PropTypes.bool,
      error: PropTypes.any,
    }),
  }),
  getAddressList: PropTypes.func.isRequired,
  submitNewAddress: PropTypes.func.isRequired,
};

AddressListContainer.defaultProps = {
  addresses: {
    loading: false,
    items: [],
    form: {
      submitting: false,
      error: null,
    },
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressListContainer);
