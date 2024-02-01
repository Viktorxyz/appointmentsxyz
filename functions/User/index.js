import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { onCall } from 'firebase-functions/v2/https';

import {
  COLLECTIONS,
  PERMISSIONS,
  ROLES,
  hasRequiredFields,
  hasOnlyFields,
  hasPermission,
  isAuthenticated
} from '../utils.js'
import { _getRolePermissions } from '../Role/utils.js';
import {
  _getAllUsers,
  _getUsersByIDs,
  _getUsersByRoles,
  _validateUsername,
  _validatePhoneNumber,
  _updateUserRoles,
  _getUserRoles
} from './utils.js';

// import { _getRolePermissions } from '../Role/util.js'

const db = getFirestore();

export const signUpUser = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth)
    const {
      username,
      phoneNumber,
      businessAccount
    } = data;

    await _validateUsername(username);
    await _validatePhoneNumber(phoneNumber);

    if (businessAccount) await _updateUserRoles(auth.uid, [ROLES.owner])
    else await _updateUserRoles(auth.uid, [ROLES.client])

    return db.collection(COLLECTIONS.users).doc(auth.uid).create({ username, phoneNumber })
  } catch (error) {
    return Promise.reject(error);
  }
})

export const getUser = onCall(async (request) => { // request data should have user's id which want to read
  const { auth, data } = request
  try {
    await isAuthenticated(auth)
    const uid = data?.uid || auth.uid
    return {
      uid,
      email: (await getAuth().getUser(uid)).email,
      ...(await db.collection(COLLECTIONS.users).doc(uid).get()).data()
    };
  } catch (error) {
    return Promise.reject(error);
  }
});

export const getUserRoles = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth)
    const { uid } = data;
    return _getUserRoles(uid)
  } catch (error) {
    return Promise.reject(error)
  }
})

export const getUsers = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth);
    await hasOnlyFields(data, ["roles", "uids"])
    if (data.uids) {
      return await _getUsersByIDs(data.uids)
    } else if (data.roles) {
      return await _getUsersByRoles(data.roles)
    } else {
      return await _getAllUsers()
    }
  } catch (error) {
    return Promise.reject(error);
  }
})

export const deleteUser = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth);
    await hasPermission(auth.uid, PERMISSIONS.user_delete);
    await hasRequiredFields(data, ['uid']);
    return db.collection(COLLECTIONS.users).doc(data.uid).delete();
  } catch (error) {
    return Promise.reject(error);
  }
})

export const validateUsername = onCall(async (request) => {
  const { data } = request;
  try {
    return _validateUsername(data);
  } catch (error) {
    return Promise.reject(error);
  }
});