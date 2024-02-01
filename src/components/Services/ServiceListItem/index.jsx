import './style.css'
import { Link } from 'react-router-dom'

function ServiceListItem({ service }) {
  return (
    <Link className='service-list-item' to={`${service.id}`}>
      {service.name}
    </Link>
  )
}

export default ServiceListItem