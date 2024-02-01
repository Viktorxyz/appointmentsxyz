import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useClients } from '../../../../contexts/ClientsProvider'
import UserProfile from '../../../../components/UserProfile'

function Client() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [clients, fetchClients] = useClients()
  const [client, setClient] = useState(() => { return { id, ...clients[id] } })

  const back = () => {
    navigate(-1)
  }

  const edit = () => {
    console.log('editing');
  }

  return (
    <div className='container'>
      <UserProfile user={client} />
      <div className='buttons'>
        <button onClick={back}>Back</button>
        <button onClick={edit}>Edit</button>
      </div>
    </div>
  )
}

export default Client