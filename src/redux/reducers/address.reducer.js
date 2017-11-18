import _keys from 'lodash/keys';
import {
  retrieveAddress,
  createNewAddress,
  updateAddress,
} from '../../firebase/controllers/address.controller';

export const GET_ADDRESS_LIST_REQUEST = 'address/GET_ADDRESS_LIST_REQUEST';
export const GET_ADDRESS_LIST_SUCCESS = 'address/GET_ADDRESS_LIST_SUCCESS';
export const GET_ADDRESS_LIST_FAILURE = 'address/GET_ADDRESS_LIST_FAILURE';

export const SUBMIT_ADDRESS_REQUEST = 'addressFormSubmit/SUBMIT_ADDRESS_REQUEST';
export const SUBMIT_ADDRESS_SUCCESS = 'addressFormSubmit/SUBMIT_ADDRESS_SUCCESS';
export const SUBMIT_ADDRESS_FAILURE = 'addressFormSubmit/SUBMIT_ADDRESS_FAILURE';

export const EDIT_ADDRESS_SET = 'addressFormEdit/EDIT_ADDRESS_SET';
export const EDIT_ADDRESS_DISCARD = 'addressFormEdit/EDIT_ADDRESS_DISCARD';
export const EDIT_ADDRESS_REQUEST = 'addressFormEdit/EDIT_ADDRESS_REQUEST';
export const EDIT_ADDRESS_SUCCESS = 'addressFormEdit/EDIT_ADDRESS_SUCCESS';
export const EDIT_ADDRESS_FAILURE = 'addressFormEdit/EDIT_ADDRESS_FAILURE';

const initialState = {
  items: [],
  loading: false,
  form: {
    submitting: false,
    error: null,
  },
  edittingItemId: null,
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

    case SUBMIT_ADDRESS_REQUEST:
    case EDIT_ADDRESS_REQUEST: {
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
        edittingItemId: null,
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

    case EDIT_ADDRESS_SET: {
      return {
        ...state,
        edittingItemId: action.payload,
      };
    }

    case EDIT_ADDRESS_DISCARD: {
      return {
        ...state,
        edittingItemId: null,
      };
    }

    case EDIT_ADDRESS_SUCCESS: {
      const newItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload, isUpdated: true };
        }
        return item;
      });
      return {
        ...state,
        items: newItems,
        form: {
          ...state.form,
          submitting: false,
        },
        edittingItemId: null,
      };
    }

    case EDIT_ADDRESS_FAILURE: {
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

export const requestEditAddress = id => ({
  type: EDIT_ADDRESS_SET,
  payload: id,
});

export const discardEditAddress = () => ({
  type: EDIT_ADDRESS_DISCARD,
});

export const updateExistAddress = data => (dispatch) => {
  dispatch({ type: EDIT_ADDRESS_REQUEST });

  updateAddress(data)
    .then(() => dispatch({
      type: EDIT_ADDRESS_SUCCESS,
      payload: data,
    }))
    .catch(err => dispatch({
      type: EDIT_ADDRESS_FAILURE,
      payload: err,
    }));
};
