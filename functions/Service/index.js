import { COLLECTIONS, hasOnlyFields, hasRequiredFields, isAuthenticated } from '../utils.js';
import { onCall } from "firebase-functions/v2/https";
import { getFirestore } from 'firebase-admin/firestore';
import { _validateServiceName } from './util.js';

const db = getFirestore()

export const createService = onCall(async (request) => {
  const { auth, data } = request
  try {
    await isAuthenticated(auth)
    await hasOnlyFields(data, [
      "name",
      "price",
      "description",
      "duration",
      "color"
    ])
    await hasRequiredFields(data, [
      "name",
      "price",
      "duration"
    ])
    await _validateServiceName(data.name)
    return await db.collection(COLLECTIONS.services).doc().create(data)
  } catch (error) {
    return Promise.reject(error)
  }
})

export const getServices = onCall(async (request) => {
  const { auth } = request;
  try {
    await isAuthenticated(auth)
    // await hasPermission(auth.uid, "SERVICE_GET")
    const serviceRefs = await db.collection(COLLECTIONS.services).get()
    return serviceRefs.docs.map(s => Object.assign(s.data(), { id: s.id }))
  } catch (error) {
    return Promise.reject(error)
  }
})

export const updateService = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth)
    // await isAuthorized(auth, "SERVICE_UPDATE")
    await hasOnlyFields(data, [
      "id",
      "name",
      "price",
      "duration",
      "description",
      "color"
    ])
    await hasRequiredFields(data, [
      "id"
    ])
    const id = data.id
    delete data.id
    return await db.collection(COLLECTIONS.services).doc(id).update(data)
  } catch (error) {
    return Promise.reject(error)
  }
})

export const deleteService = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth)
    await hasOnlyFields(data, ["id"])
    await hasRequiredFields(data, ["id"])
    return db.collection(COLLECTIONS.services).doc(data.id).delete()
  } catch (error) {
    return Promise.reject(error)
  }
})