import './style.css'
import { useClients } from '../../contexts/ClientsProvider'
import ClientListItem from '../Clients/ClientListItem'
import MultiSelectOption from '../MultiSelectOption'

function AppointmentClients({ clients, setClients }) {
  const [allClients,] = useClients()

  const onSelect = (option) => {
    if (clients.includes(option)) setClients((prev) => prev.filter(item => item !== option))
    else setClients((prev) => [...prev, option])
  }

  return (
    <div className='list appointment-clients'>
      {allClients.map((client, i) =>
        <MultiSelectOption key={i} option={client.id} isSelected={clients.includes(client.id)} onSelect={onSelect}>
          <ClientListItem client={client} />
        </MultiSelectOption>
      )}
    </div>
  )
}

export default AppointmentClients