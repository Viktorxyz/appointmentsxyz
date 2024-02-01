import { createContext, useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { functionsGetUsers } from '../firebase'
import Loading from '../components/Loading'

const ClientsContext = createContext()

export const useClients = () => {
  return useContext(ClientsContext)
}

function ClientsProvider() {
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState()

  const fetchClients = async () => {
    const data = (await functionsGetUsers({ roles: ['CLIENT'] })).data
    // const jsonData = Object.fromEntries(data.map(({ id, ...rest }) => [id, rest]))
    setClients(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchClients()
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <ClientsContext.Provider value={[clients, fetchClients]}>
      <Outlet />
    </ClientsContext.Provider>
  )
}

export default ClientsProvider