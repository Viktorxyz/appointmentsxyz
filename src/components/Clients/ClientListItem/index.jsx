import './style.css'
import { Link } from 'react-router-dom'

function ClientListItem({ client }) {
  return (
    <Link className='client-list-item' to={client.id}>
      <div className='profile-image'>{client.username.charAt(0).toUpperCase()}</div>
      <div className='username'>{client.username}</div>
    </Link>
  )
}

export default ClientListItem