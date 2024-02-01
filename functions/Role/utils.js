// import { initializeApp } from 'firebase-admin'
// initializeApp()
import { getFirestore } from 'firebase-admin/firestore';
import { FieldPath } from 'firebase-admin/firestore';
import { COLLECTIONS } from '../utils.js';

const db = getFirestore();

export const _getRolePermissions = async (role) => {
  try {
    return (await db.collection(COLLECTIONS.roles).doc(role).get()).data().permissions;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const _getRolesByIDs = async (uids) => {
  try {
    const rolesRefs = (await db.collection(COLLECTIONS.roles).where(FieldPath.documentId(), "in", uids).get())
    const roles = rolesRefs.docs.map(role => role.data())
    return roles
  } catch (error) {
    return Promise.reject(error);
  }
}

export const _getRoles = async () => {
  try {
    return (await db.collection(COLLECTIONS.roles).get())
  } catch (error) {
    return Promise.reject(error);
  }
}