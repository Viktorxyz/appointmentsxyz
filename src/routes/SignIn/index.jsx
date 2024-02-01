import Input from '../../components/Input.jsx';
import Link from '../../components/Link.jsx';
import InputImage from '../../components/InputImage.jsx';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { useState } from 'react';
import './style.css'

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInUser } = useAuth()

  const signIn = () => {
    signInUser({ email, password });
  }

  return (
    <div className='container'>
      <div className='sign-in'>
        <h1>Sign In</h1>
        <div className='inputs'>
          <Input placeholder='Email' type="text" onChange={setEmail} />
          <Input placeholder='Password' type='password' onChange={setPassword} />
        </div>
        <div className='sign-in__options'>
          <InputImage src="../../../google.png" />
          <InputImage src="../../../apple.png" />
          <InputImage src="../../../facebook.png" />
        </div>
        <div className='buttons'>
          <Link to="/sign-up">Sign Up</Link>
          <button onClick={signIn}>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn