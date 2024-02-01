import { useState } from 'react'
import ServiceView from '../../../components/ServiceView'
import { useNewBusiness } from '../../../contexts/NewBusinessProvider'
import './style.css'
import { cloneDeep } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'

function NewBusinessService() {
  let isNew = false;
  const { id } = useParams()
  const navigate = useNavigate()
  const [services, setServices] = useNewBusiness().services
  const [service, setService] = useState(() => {
    if (!services[id]) {
      isNew = true
      return { id }
    } else return cloneDeep(services[id])
  })

  const save = async () => {
    if (isNew) setServices(services => [...services, service])
    else setServices(services => {
      console.log(services);
      const next = [...services]
      next[id] = service
      return next
    })
    navigate(-1)
  }

  const deleteService = async () => {
    setServices(services => {
      const next = [...services]
      next.splice(id, 1)
      return next
    })
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

export default NewBusinessService