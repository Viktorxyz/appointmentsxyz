import ServiceListItem from './ServiceListItem'

function Services({ services }) {
  return (
    <div className='services'>
      {services.map(service => <ServiceListItem service={service} />)}
    </div>
  )
}

export default Services