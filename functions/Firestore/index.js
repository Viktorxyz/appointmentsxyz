import functions from 'firebase-functions'
import { COLLECTIONS, ROLES, PERMISSIONS } from '../utils.js'
import { getFirestore } from 'firebase-admin/firestore'

const db = getFirestore()

const setBatchPermissions = async (batch) => {
  Object.values(PERMISSIONS).forEach(permission => {
    const docRef = db.collection(COLLECTIONS.permissions).doc(permission);
    batch.set(docRef, {
      roles: [
        ROLES.admin,
      ]
    })
  })
}

const setBatchRoles = async (batch) => {
  Object.values(ROLES).forEach(role => {
    const docRef = db.collection(COLLECTIONS.roles).doc(role);
    batch.set(docRef, { users: [] })
  })
}

export const initializeFirestore = functions.firestore
  .document('initialize/{documentId}')
  .onCreate(async (snapshot, context) => {
    const initializationFlag = await db.collection(COLLECTIONS.initialize).doc('flag').get()

    if (!initializationFlag.exists) {
      try {
        const batch = db.batch();
        setBatchPermissions(batch);
        setBatchRoles(batch);
        batch.commit();
        await db.collection('initialize').doc('flag').set({
          initialized: true
        })
      } catch (error) {
        console.log(error);
      }
    }
  })