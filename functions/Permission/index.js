import { PERMISSIONS, COLLECTIONS, hasPermission, isAuthenticated, hasOnlyFields } from '../utils.js';
import { getFirestore } from 'firebase-admin/firestore';
import { onCall } from 'firebase-functions/v2/https';

const db = getFirestore()

// const adminId = 'bpBbRpY9bGXLzn0cdjeYBEHKbTkF';

// export const generatePermissions = onCall(async (request) => {
//   const { auth } = request;
//   try {
//     await isAuthenticated(auth);
//     await hasPermission(auth.uid, PERMISSION.PERMISSION_CREATE);
//     Object.values(PERMISSION).forEach(async permission => {
//       await db.collection(COLLECTION.Permission).doc(permission).set({ users: [adminId] }, { merge: true });
//     });
//     return true;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// });

export const getPermissions = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth);
    await hasPermission(auth.uid, PERMISSIONS.permission_read);
    await hasOnlyFields(data, ["uids"]);
    const permissionRefs = await db.collection(COLLECTIONS.permissions).listDocuments();
    const permissions = (await (db.getAll(...permissionRefs))).map(permission => {
      return {
        id: permission.id,
      }
    });
    return permissions;
  } catch (error) {
    return Promise.reject(error);
  }
});