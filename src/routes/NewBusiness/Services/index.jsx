import './style.css'
import { Link } from 'react-router-dom'
import Services from '../../../components/Services'
import { useNewBusiness } from '../../../contexts/NewBusinessProvider'

function NewBusinessServices() {
  const [services,] = useNewBusiness().services

  return (
    <div className='new-business-services services'>
      <h1>Start adding services</h1>
      <Services services={[...services].map((s, i) => ({ ...s, id: i }))} />
      <Link to={`${services.length}`} className='new-service'>
        <img src="../../../plus.png" alt="" />
      </Link>
    </div>
  )
}

export default NewBusinessServices