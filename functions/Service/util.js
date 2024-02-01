import { getFirestore } from 'firebase-admin/firestore'
import { COLLECTIONS, hasOnlyFields, hasRequiredFields, hasRequiredFieldsV2 } from '../utils.js'
import { HttpsError } from 'firebase-functions/v2/https'
import { debug } from 'firebase-functions/logger'

const db = getFirestore()

export const _validateServiceName = async (name) => {
  try {
    if (name.lenght < 1) return Promise.reject(new HttpsError('invalid-argument', 'Service name must be at least 1 character'))
    const count = (await db.collection(COLLECTIONS.services).where('name', '==', name).count().get()).data().count
    if (count > 0) return Promise.reject(new HttpsError('failed-precondition', 'Service name is not unique'))
    else return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const _createServices = async (services) => {
  try {
    const batch = db.batch()

    for (let i = 0; i < services.lenght; i++) {
      const { name, description, price, duration, color } = services[i]
      await hasRequiredFieldsV2({ name, price, duration })

      const docRef = db.collection(COLLECTIONS.services).doc()
      batch.set(docRef, { name, description, price, duration, color })
    }

    return batch.commit()
  } catch (error) {
    return Promise.reject(error)
  }
}