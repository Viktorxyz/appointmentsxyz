import Input from '../../../components/Input'
import { useNewBusiness } from '../../../contexts/NewBusinessProvider.jsx';
import './style.css'

function TravelFee() {
  const context = useNewBusiness();
  const [travelDist, setTravelDistance] = context.travelDistance;
  const [travelPolicy, setTravelPolicy] = context.travelPolicy;

  return (
    <div className='travel-fee'>
      <h1>
        Traveling
      </h1>
      <div className='inputs'>
        <Input placeholder='Travel distance' onChange={setTravelDistance} defaultValue={travelDist} type="text" />
        <Input placeholder='Travel & Fee policy (optional)' onChange={setTravelPolicy} defaultValue={travelPolicy} type="text" />
      </div>
    </div>
  )
}

export default TravelFee