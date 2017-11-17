import _keys from 'lodash/keys';
import { retrieveAddress, createNewAddress } from '../../firebase/controllers/address.controller';

export const GET_ADDRESS_LIST_REQUEST = 'address/GET_ADDRESS_LIST_REQUEST';
export const GET_ADDRESS_LIST_SUCCESS = 'address/GET_ADDRESS_LIST_SUCCESS';
export const GET_ADDRESS_LIST_FAILURE = 'address/GET_ADDRESS_LIST_FAILURE';

export const SUBMIT_ADDRESS_REQUEST = 'addressForm/SUBMIT_ADDRESS_REQUEST';
export const SUBMIT_ADDRESS_SUCCESS = 'addressForm/SUBMIT_ADDRESS_SUCCESS';
export const SUBMIT_ADDRESS_FAILURE = 'addressForm/SUBMIT_ADDRESS_FAILURE';

const initialState = {
  items: [],
  loading: false,
  form: {
    submitting: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ADDRESS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        items: state.items.concat(action.payload),
      };
    }

    case GET_ADDRESS_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }

    case SUBMIT_ADDRESS_REQUEST: {
      return {
        ...state,
        form: {
          ...state.form,
          submitting: true,
        },
      };
    }

    case SUBMIT_ADDRESS_SUCCESS: {
      const newItem = {
        ...action.payload,
        isNew: true,
      };
      return {
        ...state,
        items: [newItem, ...state.items],
        form: {
          ...state.form,
          submitting: false,
        },
      };
    }

    case SUBMIT_ADDRESS_FAILURE: {
      return {
        ...state,
        form: {
          ...state.form,
          error: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export const getAddressList = () => (dispatch) => {
  dispatch({ type: GET_ADDRESS_LIST_REQUEST });

  retrieveAddress()
    .then((val) => {
      const items = _keys(val).map(k => val[k]).sort((a, b) => b.dateModified - a.dateModified);
      dispatch({
        type: GET_ADDRESS_LIST_SUCCESS,
        payload: items,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ADDRESS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const submitNewAddress = data => (dispatch) => {
  dispatch({ type: SUBMIT_ADDRESS_REQUEST });

  createNewAddress(data)
    .then(response => dispatch({
      type: SUBMIT_ADDRESS_SUCCESS,
      payload: response,
    }))
    .catch(err => dispatch({
      type: SUBMIT_ADDRESS_FAILURE,
      payload: err,
    }));
};
