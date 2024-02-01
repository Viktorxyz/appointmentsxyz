import { COLLECTIONS, isAuthenticated, hasOnlyFields, hasRequiredFieldsV2 } from '../utils.js';
import { getFirestore } from 'firebase-admin/firestore';
import { onCall } from 'firebase-functions/v2/https';
import { _createServices } from '../Service/util.js';

const db = getFirestore();

export const createBusiness = onCall(async (request) => {
  const { auth, data } = request
  try {
    await isAuthenticated(auth)
    const { name, address, onsite, offsite, travel_distance, travel_policy, working_hours, services } = data

    await hasRequiredFieldsV2({ name, address, working_hours })

    await db.collection(COLLECTIONS.business).doc("info").create({ name, address, onsite, offsite, travel_distance, travel_policy })

    await db.collection(COLLECTIONS.business).doc("working_hours").create(working_hours)

    if (services) {
      console.log(services);
      console.log(await _createServices(services));
    }

    return Promise.resolve("Everything went smoothly")
  } catch (error) {
    return Promise.reject(error)
  }
})

export const getBusiness = onCall(async (request) => {
  const { auth } = request;
  try {
    await isAuthenticated(auth);
    const info = (await db.collection(COLLECTIONS.business).doc("info").get()).data() || {};
    const working_hours = (await db.collection(COLLECTIONS.business).doc("working_hours").get()).data() || {};
    if (Object.keys(info).length == 6 && Object.keys(working_hours).length == 7) {
      return { ok: true, info, working_hours }
    } else {
      return { ok: false }
    }
  } catch (error) {
    return Promise.reject(error);
  }
})