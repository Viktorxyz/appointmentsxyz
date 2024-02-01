import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions"
// import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAmOTYv4UN0C-c-Y72AekgVRMl24kDkJmk",
  authDomain: "appointmentsxyz.firebaseapp.com",
  projectId: "appointmentsxyz",
  storageBucket: "appointmentsxyz.appspot.com",
  messagingSenderId: "320497197141",
  appId: "1:320497197141:web:4314f08b21fdc3748f34dc",
  measurementId: "G-1D3WVQK32J"
}

const app = initializeApp(firebaseConfig)

export const functions = getFunctions(app)
connectFunctionsEmulator(functions, "localhost", 5001)

export const auth = getAuth(app)
connectAuthEmulator(auth, "http://localhost:9099")

// export const firestore = getFirestore(app)
// connectFirestoreEmulator(firebaseConfig, "localhost", "8080")

export const isUsernameUnique = httpsCallable(functions, "isUsernameUnique")
export const functionsSignUpUser = httpsCallable(functions, "signUpUser")
export const functionsGetUser = httpsCallable(functions, "getUser")
export const functionsGetUserRoles = httpsCallable(functions, "getUserRoles")
export const functionsGetBusiness = httpsCallable(functions, "getBusiness")
export const functionsCreateBusiness = httpsCallable(functions, "createBusiness")
export const functionsCreateService = httpsCallable(functions, "createService")
export const functionsGetServices = httpsCallable(functions, "getServices")
export const functionsUpdateService = httpsCallable(functions, "updateService")
export const functionsDeleteService = httpsCallable(functions, "deleteService")
export const functionsCreateAppointment = httpsCallable(functions, "createAppointment")
export const functionsUpdateAppointment = httpsCallable(functions, "updateAppointment")
export const functionsGetAppointments = httpsCallable(functions, "getAppointments")
export const functionsGetAppointment = httpsCallable(functions, "getAppointment")
export const functionsGetUsers = httpsCallable(functions, "getUsers")