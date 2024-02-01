import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import ServiceView from '../../../../components/ServiceView'
import { useState } from 'react'
import { functionsCreateService, functionsDeleteService, functionsUpdateService } from '../../../../firebase.js'
import { useServices } from '../../../../contexts/ServicesProvider'

function Service() {
  const { id } = useParams()
  const isNew = id === 'new-service' ? true : false;
  const navigate = useNavigate()
  const [services, fetchServices] = useServices()
  const [service, setService] = useState(() => { return { ...services?.find(s => s.id == id) } })

  const save = async () => {
    if (isNew) await functionsCreateService(service);
    else await functionsUpdateService(service);
    await fetchServices()
    navigate(-1)
  }

  const deleteService = async () => {
    await functionsDeleteService({ id: service.id });
    await fetchServices()
    navigate(-1)
  }

  const back = () => {
    navigate(-1)
  }

  return (
    <div className='service container'>
      <h1>{isNew ? "New service" : "Edit service"}</h1>
      <ServiceView service={service} setService={setService} />
      <div className='list buttons'>
        {!isNew && <button className='delete-service' onClick={deleteService}>Delete</button>}
        <div className='buttons'>
          <button onClick={back}>Back</button>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Service