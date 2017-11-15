import _keys from 'lodash/keys';
import { retrieveAddress } from '../../firebase/controllers/address.controller';

export const GET_ADDRESS_LIST_REQUEST = 'address/GET_ADDRESS_LIST_REQUEST';
export const GET_ADDRESS_LIST_SUCCESS = 'address/GET_ADDRESS_LIST_SUCCESS';
export const GET_ADDRESS_LIST_FAILURE = 'address/GET_ADDRESS_LIST_FAILURE';

const initialState = {
  items: [],
  loading: false,
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

    default:
      return state;
  }
};

export const getAddressList = () => (dispatch) => {
  dispatch({ type: GET_ADDRESS_LIST_REQUEST });

  retrieveAddress()
    .then((val) => {
      const items = _keys(val).map(k => val[k]);
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
