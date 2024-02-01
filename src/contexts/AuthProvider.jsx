import { createContext, useContext, useEffect, useState } from 'react'
import { auth, functionsSignUpUser, functionsGetUser } from '../firebase.js'
import { Outlet, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  // setPersistence,
  // browserLocalPersistence,
  signOut
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

function AuthProvider() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  const signUpUser = async ({ email, password, username, businessAccount, phoneNumber }) => {
    // await setPersistence(auth, browserLocalPersistence);
    await createUserWithEmailAndPassword(auth, email, password);
    await functionsSignUpUser({ username, businessAccount, phoneNumber });
  }
  const signInUser = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  }
  const signOutUser = async () => {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let userData = null;
      if (user) userData = await functionsGetUser();
      setCurrentUser(userData?.data);
      setLoading(false);
      navigate('/');
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signUpUser,
    signInUser,
    signOutUser
  }

  return (
    <>
      {!loading &&
        <>
          <AuthContext.Provider value={value}>
            <Outlet />
          </AuthContext.Provider>
        </>
      }
    </>
  )
}

export default AuthProvider