import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import { useNewBusiness } from '../../../contexts/NewBusinessProvider'
import './style.css'

function NewBusinessInfo() {
  const context = useNewBusiness()
  const [businessName, setBusinessName] = context.businessName;
  const [onsite, setOnsite] = context.onsite;
  const [offsite, setOffsite] = context.offsite;
  const [businessAddress, setBusinessAddress] = context.businessAddress;

  return (
    <div className='business-info'>
      <h1>
        Business info
      </h1>
      <div className='inputs'>
        <Input onChange={setBusinessName} placeholder='Business name' defaultValue={businessName} type="text" />
        <Input onChange={setBusinessAddress} placeholder='Business location' defaultValue={businessAddress} type="text" />
        <h3>Where do you work</h3>
        <Checkbox label='At business location' onChange={setOnsite} defaultChecked={onsite} />
        <Checkbox label="At client's location" onChange={setOffsite} defaultChecked={offsite} />
      </div>
    </div>
  )
}

export default NewBusinessInfo