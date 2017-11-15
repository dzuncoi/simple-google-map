import uuid from 'uuid/v4';
import firebase from '../firebase';

const getAddressRef = () => 'addresses';
const getDetailAddressRef = id => `addresses/${id}`;

export const createNewAddress = (data) => {
  const id = uuid();
  const ref = getDetailAddressRef(id);
  return firebase.database().ref(ref).set({
    ...data,
    id,
    dateCreated: Date.now(),
    dateModified: Date.now(),
  });
};

export const updateAddress = (data) => {
  const { id } = data;
  const ref = getDetailAddressRef(id);
  return firebase.database().ref(ref).update(data);
};

export const retrieveAddress = () => {
  const ref = getAddressRef();
  return new Promise((resolve) => {
    firebase.database().ref(ref).on('value', snapshot => resolve(snapshot.val()));
  });
};

export default {
  createNewAddress,
  updateAddress,
  retrieveAddress,
};
