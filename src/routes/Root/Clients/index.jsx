import { useClients } from '../../../contexts/ClientsProvider'
import ClientsComponent from '../../../components/Clients'
import './style.css'

function Clients() {
  const [clients,] = useClients()

  return (
    <div className='container'>
      <h1>Clients</h1>
      <ClientsComponent clients={clients} />
    </div>
  )
}

export default Clients