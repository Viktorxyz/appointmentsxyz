import Input from '../../components/Input'
import './style.css'

function ServiceView({ service, setService }) {
  const setName = (name) => {
    setService(service => Object.assign(service, { name }))
  }
  const setColor = (color) => {
    setService(service => Object.assign(service, { color }))
  }
  const setDescription = (description) => {
    setService(service => Object.assign(service, { description }))
  }
  const setPrice = (price) => {
    setService(service => Object.assign(service, { price }))
  }
  const setDuration = (duration) => {
    setService(service => Object.assign(service, { duration }))
  }

  return (
    <div className='service-view'>
      <div className='inputs'>
        <Input placeholder="Name" defaultValue={service?.name} onChange={setName} type="text" />
        <Input defaultValue={service.color || "#41ead4"} onChange={setColor} type="color" />
        <Input placeholder="Description (optional)" defaultValue={service?.description} onChange={setDescription} type="text" />
        <Input placeholder="Price" defaultValue={service?.price} type="number" onChange={setPrice} />
        <Input placeholder="Duration" defaultValue={service?.duration} type="number" onChange={setDuration} />
      </div>
    </div>
  )
}

export default ServiceView