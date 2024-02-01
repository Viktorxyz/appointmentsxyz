import { Outlet } from 'react-router-dom'
import { useNewBusiness } from '../../contexts/NewBusinessProvider'
import './style.css'

function Steps() {
  const { step, steps, changeStep, finish } = useNewBusiness()

  return (
    <div className='container'>
      <Outlet />
      <div className='buttons'>
        {step > 0 && <button onClick={changeStep} value={-1}>Back</button >}
        {step < steps.length - 1 && <button onClick={changeStep} value={1} type='submit'>Next</button >}
        {step === steps.length - 1 && <button onClick={finish}>Finish</button >}
      </div>
    </div>
  )
}

export default Steps