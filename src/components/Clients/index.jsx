import ClientListItem from './ClientListItem'
import './style.css'

function Clients({ clients }) {
  return (
    <div className='clients'>
      <div className='list-clients list'>
        {clients && clients.map((client, i) => <ClientListItem client={client} key={i} />)}
      </div>
    </div>
  )
}

export default Clients