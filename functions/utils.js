import { initializeApp } from 'firebase-admin/app'
initializeApp()
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';
import 'firebase-functions/logger/compat'

const db = getFirestore()
db.settings({ ignoreUndefinedProperties: true })

export const PERMISSIONS = {
  // ALL PERMISSIONS
  all: "ALL",
  // COLLECTION: User
  user_create: "USER_CREATE",
  user_read: "USER_READ", // only fields: username, gender
  user_update: "USER_UPDATE", // only fields: username, gender
  user_delete: "USER_DELETE",
  // COLLECTION: User / permissions
  user_permission_read: "USER_PERMISSION_READ",
  user_permission_update: "USER_PERMISSION_UPDATE",
  // COLLECTION: User / roles
  user_roles_read: "USER_ROLES_READ",
  user_roles_update: "USER_ROLES_UPDATE",
  // COLLECTION: User / appointments
  user_appointments_read: "USER_APPOINTMENTS_READ",
  user_appointments_update: "USER_APPOINTMENTS_UPDATE",
  // COLLECTION: User / bookings
  user_bookings_read: "USER_BOOKINGS_READ",
  user_bookings_update: "USER_BOOKINGS_UPDATE",
  // COLLECTION: Role
  role_create: "ROLE_CREATE",
  role_read: "ROLE_READ",
  role_update: "ROLE_UPDATE",
  role_delete: "ROLE_DELETE",
  // COLLECTION: Permission
  permission_create: "PERMISSION_CREATE",
  permission_read: "PERMISSION_READ",
  permission_update: "PERMISSION_UPDATE",
  permission_delete: "PERMISSION_DELETE",
};

export const ROLES = {
  client: 'CLIENT',
  admin: 'ADMIN',
  owner: 'OWNER'
}

export const COLLECTIONS = {
  initialize: 'initialize',
  users: 'users',
  permissions: 'permissions',
  roles: 'roles',
  business: 'business',
  services: 'services',
  appointments: 'appointments'
}

export const isAuthenticated = (auth) => {
  try {
    if (auth) return true;
    else return Promise.reject(new HttpsError('unauthenticated'));
  } catch (error) {
    return error;
  }
}
export const hasPermission = async (uid, permission) => {
  const permissionRef = await db.collection(COLLECTIONS.permissions).doc(permission).get()
  if (permissionRef.data().users.includes(uid)) return true;
  else return Promise.reject(new HttpsError('permission-denied', 'User has not permission ' + permission));
}
export const hasRequiredFieldsV2 = (fields) => {
  const requiredFields = []
  Object.entries(fields).forEach(([key, value]) => value == null && requiredFields.push(key))
  if (requiredFields.length > 0)
    return Promise.reject(new HttpsError('invalid-argument', `Has not required fields: ${requiredFields.join(', ')}`))
  else
    return Promise.resolve(true)
}
export const hasRequiredFields = (requestFields, requiredFields) => {
  if (!requestFields) return Promise.reject(new HttpsError('invalid-argument', 'Has not required fields'));
  const fields = Object.keys(requestFields) || [];
  if (requiredFields.every(f => fields.includes(f))) return Promise.resolve(true);
  else return Promise.reject(new HttpsError('invalid-argument', 'Has not required fields'));
};
export const hasOnlyFields = (requestFields, onlyFields) => {
  if (!requestFields) return Promise.resolve(true);
  const fields = Object.keys(requestFields);
  if (fields.length > onlyFields.length) return Promise.reject('Has unexpected fields');
  if (fields.every((f) => onlyFields.includes(f))) return Promise.resolve(true);
  else return Promise.reject(new HttpsError('invalid-argument', 'Has unexpected fields'));
};