import { useAuth } from '../../../contexts/AuthProvider'

function Settings() {
  const { signOutUser } = useAuth()

  return (
    <div className='container'>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  )
}

export default Settings