import { createContext, useContext, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { Outlet } from 'react-router-dom'
import { functionsGetServices } from '../firebase'

const ServicesContext = createContext()

export const useServices = () => {
  return useContext(ServicesContext)
}

function ServicesProvider() {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState()

  const fetchServices = async () => {
    const data = (await functionsGetServices()).data
    // const jsonData = Object.fromEntries(data.map(({ id, ...rest }) => [id, rest]))
    setServices(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchServices()
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <ServicesContext.Provider value={[services, fetchServices]}>
      <Outlet />
    </ServicesContext.Provider>
  )
}

export default ServicesProvider