import { useNewBusiness } from '../../../contexts/NewBusinessProvider';
import WorkingHours from '../../../components/WorkingHours';
import './style.css'

function NewBusinessWorkingHours() {
  const context = useNewBusiness()
  const [workingHours, setWorkingHours] = context.workingHours;

  return (
    <div className='new-business-working-hours'>
      <h1>Working Hours</h1>
      <WorkingHours workingHours={workingHours} setWorkingHours={setWorkingHours} />
    </div>
  )
}

export default NewBusinessWorkingHours