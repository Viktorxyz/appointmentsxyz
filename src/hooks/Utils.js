import { useAuth } from '../contexts/AuthProvider'
import { functionsGetUserRoles } from '../firebase'

function useUtils() {
  const { currentUser } = useAuth()

  const isCurrentUserBusinessAccount = () => {
    return currentUserHasRoles(["OWNER"])
  }

  const currentUserHasRoles = async (roles) => {
    const userRoles = (await functionsGetUserRoles({ uid: currentUser.uid })).data;
    return roles.every(role => userRoles.includes(role))
  }

  return {
    currentUserHasRoles,
    isCurrentUserBusinessAccount
  }
}

export default useUtils