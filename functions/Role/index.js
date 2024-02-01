import { COLLECTIONS, PERMISSIONS, hasOnlyFields, hasPermission, hasRequiredFields, isAuthenticated } from '../utils.js';
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { _getRolePermissions, _getRoles, _getRolesByIDs } from './utils.js';

const db = getFirestore();

const _isRoleUnique = async (role) => {
  try {
    if ((await db.collection(COLLECTIONS.Role).doc(role).get()).exists)
      return Promise.reject(new HttpsError('failed-precondition', 'Role is not unique'));
    else
      return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const createRole = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth);
    await hasPermission(auth.uid, PERMISSIONS.role_create);
    await hasRequiredFields(data, ["id"]);
    await hasOnlyFields(data, ["id", "permissions"]);
    await _isRoleUnique(data.id);
    return db.collection(COLLECTIONS.roles).doc(data.id).create({ permissions: data?.permissions || [] });
  } catch (error) {
    return Promise.reject(error);
  }
});

export const getRoles = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await isAuthenticated(auth);
    await hasPermission(auth.uid, PERMISSIONS.role_read);
    await hasOnlyFields(data, ["uids"]);
    const res = (data.uids) ?
      await _getRolesByIDs(data.uids) :
      await _getRoles();
    console.log(res);
    // const roleRefs = await db.collection(COLLECTIONS.Role).get()
    // const roles = (await (db.getAll(...roleRefs))).map(role => {
    //   return {
    //     id: role.id,
    //     ...role.data()
    //   }
    // });
    // console.log(roles);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
})

export const getRolePermissions = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await hasPermission(auth.uid, PERMISSIONS.role_read);
    await hasRequiredFields(data, ['role']);
    return _getRolePermissions(data.role);
  } catch (error) {
    return Promise.reject(error);
  }
});
export const addRolePermissions = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await hasPermission(auth.uid, PERMISSIONS.role_update);
    await hasRequiredFields(data, ['role', 'permissions']);
    return db.collection(COLLECTIONS.roles).doc(data.role).update({ permissions: FieldValue.arrayUnion(data.permissions) });
  } catch (error) {
    return error;
  }
});
export const removeRolePermissions = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await hasPermission(auth.uid, PERMISSIONS.role_update);
    await hasRequiredFields(data, ['role', 'permissions']);
    return db.collection(COLLECTIONS.roles).doc(data.role).update({ permissions: FieldValue.arrayRemove(data.permissions) });
  } catch (error) {
    return error;
  }
});
export const deleteRole = onCall(async (request) => {
  const { auth, data } = request;
  try {
    await hasRequiredFields(data, ['role']);
    return db.collection(COLLECTIONS.roles).doc(data.role).delete();
  } catch (error) {
    return error;
  }
});
