import { Navigate, Outlet } from 'react-router-dom'
import useUtils from '../../hooks/Utils.js'
import { functionsGetBusiness } from '../../firebase.js'
import { useEffect, useState } from 'react'

function Root() {
  const { isCurrentUserBusinessAccount } = useUtils()
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await functionsGetBusiness()).data;
      setOk(data.ok);
      setLoading(false);
    }
    fetchData();
  }, [])

  if (loading) return <p>Loading...</p>
  else {
    if (ok) {
      return <Outlet />
    } else {
      if (isCurrentUserBusinessAccount()) return (
        <>
          <Navigate to="new-business" />
          <Outlet />
        </>
      )
      else return <p>{"Business doesn't exist"}</p>
    }
  }
}
export default Root