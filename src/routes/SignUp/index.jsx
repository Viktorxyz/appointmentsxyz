import Input from '../../components/Input.jsx';
import Link from '../../components/Link.jsx';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../components/Checkbox';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { useState } from 'react';
import './style.css'

function SignUp() {
  const { signUpUser } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessAccount, setBusinessAccount] = useState(false);

  const signUp = async () => {
    await signUpUser({ username, email, password, businessAccount, phoneNumber })
  }

  return (
    <div className='container'>
      <div className='sign-in'>
        <h1>Sign Up</h1>
        <div className='inputs sign-in__inputs'>
          <Input placeholder='Username' type='text' onChange={setUsername} />
          <Input placeholder='Email' type='text' onChange={setEmail} />
          <Input placeholder='Password' type='password' onChange={setPassword} />
          <Input placeholder='Phone number' type='tel' onChange={setPhoneNumber} />
          <Checkbox defaultChecked={businessAccount} label='Business account' onChange={setBusinessAccount} />
        </div>
        <div className='buttons'>
          <Link to="/sign-in">Sign In</Link>
          <button onClick={signUp}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp