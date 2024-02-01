import { HttpsError } from 'firebase-functions/v2/https';
import { FieldPath, FieldValue, getFirestore } from 'firebase-admin/firestore';
import { COLLECTIONS } from '../utils.js';
import { _getRolesByIDs } from '../Role/utils.js';
import lodash from 'lodash';
const { union } = lodash;
import { phone } from 'phone';

const db = getFirestore()

export const _validateUsername = async (username) => {
  try {
    if (username.lenght < 1) return Promise.reject(new HttpsError('invalid-argument', 'Username must be at least 1 character'))
    const count = (await db.collection(COLLECTIONS.users).where('username', '==', username).count().get()).data().count;
    if (count > 0) return Promise.reject(new HttpsError('already-exists', 'Username is not unique'));
    else return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const _validatePhoneNumber = async (phoneNumber) => {
  try {
    if (!phone(phoneNumber).isValid) return Promise.reject(new HttpsError('invalid-argument', 'Phone number is not valid'))
    const count = (await db.collection(COLLECTIONS.users).where('phoneNumber', '==', phoneNumber).count().get()).data().count
    if (count > 0) return Promise.reject(new HttpsError('already-exists', 'Phone number already exists'))
    else return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const _getUsersByIDs = async (uids) => {
  try {
    return (await db.collection(COLLECTIONS.users).where(FieldPath.documentId(), "in", uids).get()).docs.map(u => Object.assign(u.data(), { id: u.id }))
  } catch (error) {
    return Promise.reject(error);
  }
}

export const _getUsersByRoles = async (roles) => {
  try {
    const userIDs = await _getRolesByIDs(roles).then(roles => {
      let userIDs = []
      roles.forEach(role => {
        userIDs = union(userIDs, role.users)
      })
      return userIDs
    })
    if (userIDs.length > 0) return (await db.collection(COLLECTIONS.users).where(FieldPath.documentId(), "in", userIDs).get()).docs.map(u => Object.assign(u.data(), { id: u.id }))
    else return []
  } catch (error) {
    return Promise.reject(error);
  }
}

export const _getAllUsers = async () => {
  try {
    return (await db.collection(COLLECTIONS.users).get()).docs.map(user => user.data())
  } catch (error) {
    return Promise.reject(error);
  }
}

export const _updateUserRoles = async (uid, roles) => {
  try {
    const batch = db.batch();
    roles.forEach(role => {
      batch.update(db.collection(COLLECTIONS.roles).doc(role), { users: FieldValue.arrayUnion(uid) })
    })
    return batch.commit()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const _getUserRoles = async (uid) => {
  try {
    return (await db.collection(COLLECTIONS.roles).where('users', 'array-contains', uid).get()).docs.map(doc => doc.id)
  } catch (error) {
    Promise.reject(error)
  }
}