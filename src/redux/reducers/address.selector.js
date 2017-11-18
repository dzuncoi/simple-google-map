import { createSelector } from 'reselect';

const addressesSelector = state => state.address.items;
const edittingAddressId = state => state.address.edittingItemId;

export const edittingAddressSelector = createSelector(
  addressesSelector,
  edittingAddressId,
  (addresses, id) => addresses.filter(address => address.id === id)[0],
);

export default {
  edittingAddressSelector,
};
