import './style.css'
import { useServices } from '../../contexts/ServicesProvider'
import MultiSelectOption from '../MultiSelectOption'
import ServiceListItem from '../Services/ServiceListItem'

function AppointmentServices({ services, setServices }) {
  const [allServices,] = useServices()

  const onSelect = (option) => {
    if (services.includes(option)) setServices((prev) => prev.filter(item => item !== option))
    else setServices((prev) => [...prev, option])
  }

  return (
    <div className='appointment-services'>
      {allServices.map((service, i) =>
        <MultiSelectOption key={i} option={service.id} isSelected={services.includes(service.id)} onSelect={onSelect}>
          <ServiceListItem service={service} />
        </MultiSelectOption>
      )}
    </div>
  )
}

export default AppointmentServices