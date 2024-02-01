import { addHours, endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { PERMISSIONS, COLLECTIONS, hasPermission, isAuthenticated, hasOnlyFields, hasRequiredFields, hasRequiredFieldsV2 } from '../utils.js';
import { CollectionGroup, getFirestore } from 'firebase-admin/firestore';
import { onCall } from 'firebase-functions/v2/https';

const db = getFirestore()

export const getAppointments = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth)
    let { from, to } = data
    await hasRequiredFieldsV2({ from, to })
    from = new Date(data.from)
    to = new Date(data.to)
    const appointmentRefs =
      await db.collection(COLLECTIONS.appointments)
        .where("from", ">=", from)
        .where("from", "<=", to)
        .get()
    const appointments = appointmentRefs?.docs?.map(ref => {
      const data = ref.data()
      data.from = data.from.toDate().toJSON()
      data.to = data.to.toDate().toJSON()
      // data.date_created = data.date_created.toDate().toJSON()
      return data
    }) || [];
    return appointments
  } catch (error) {
    return Promise.reject(error)
  }
})

export const getAppointment = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth);
    await hasOnlyFields(data, ["id"])
    await hasRequiredFields(data, ["id"])
    return (await db.collection(COLLECTIONS.appointments).doc(data.id).get()).data()
  } catch (error) {
    return Promise.reject(error);
  }
})

export const createAppointment = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth);
    let {
      employee,
      clients,
      services,
      from,
      to,
      location,
      notes
    } = data
    let finished = false

    await hasRequiredFieldsV2({ services, from, to })

    from = new Date(from)
    to = new Date(to)

    return db.collection(COLLECTIONS.appointments).doc().create({
      employee,
      clients,
      services,
      from,
      to,
      location,
      notes,
      finished
    })
  } catch (error) {
    return Promise.reject(error)
  }
})