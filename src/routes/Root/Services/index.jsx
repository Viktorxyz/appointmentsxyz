import { Link } from 'react-router-dom'
import ServicesComponent from '../../../components/Services'
import { useServices } from '../../../contexts/ServicesProvider'
import './style.css'

function Services() {
  const [services,] = useServices()
  return (
    <div className='services container'>
      <h1>Services</h1>
      <ServicesComponent services={services} />
      <Link to='new-service' className='new-service'>
        <img src="../../../plus.png" alt="" />
      </Link>
    </div>
  )
}

export default Services