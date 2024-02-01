import { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { functionsCreateBusiness } from '../firebase.js'
import useLocalStorage from '../hooks/LocalStorage.js'

const DEFAULT_FROM_TO = { from: "08:00", to: "20:00" }

const DEFAULT_WORKING_HOURS = {
  monday: { closed: false, ...DEFAULT_FROM_TO, breaks: [] },
  tuesday: { closed: false, ...DEFAULT_FROM_TO, breaks: [] },
  wednesday: { closed: false, ...DEFAULT_FROM_TO, breaks: [] },
  thursday: { closed: false, ...DEFAULT_FROM_TO, breaks: [] },
  friday: { closed: false, ...DEFAULT_FROM_TO, breaks: [] },
  saturday: { closed: true, ...DEFAULT_FROM_TO, breaks: [] },
  sunday: { closed: true, ...DEFAULT_FROM_TO, breaks: [] },
}

const DEFAULT_SERVICES = [{
  name: 'haircut',
  price: 1000,
  description: 'just a normal haircut',
  duration: 60
}]

const NewBusinessContext = createContext()

export const useNewBusiness = () => {
  return useContext(NewBusinessContext)
}

function NewBusinessProvider() {
  const navigate = useNavigate()
  // INFO
  const [businessName, setBusinessName] = useLocalStorage("businessName", "")
  const [businessAddress, setBusinessAddress] = useLocalStorage("businessAddress", "");
  // WHERE DO YOU WORK
  const [onsite, setOnsite] = useState(true)
  const [offsite, setOffsite] = useState(false)
  // TRAVEL FEE
  const [travelDistance, setTravelDistance] = useState();
  const [travelPolicy, setTravelPolicy] = useLocalStorage("travelPolicy");
  // WORKING HOURS
  const [workingHours, setWorkingHours] = useLocalStorage("workingHours", DEFAULT_WORKING_HOURS);
  const [services, setServices] = useLocalStorage("services", DEFAULT_SERVICES);

  const [steps, setSteps] = useState(['info', 'travel-fee', 'working-hours', 'services']);
  const [step, setStep] = useState(0)

  const changeStep = (e) => {
    const value = parseInt(e.target.value);
    const nextStep = step + value;
    if (nextStep >= 0 && nextStep < steps.length) {
      setStep(nextStep)
      navigate(steps[nextStep])
    }
  }

  useEffect(() => {
    if (offsite) setSteps(steps => {
      const next = [...steps]
      next.splice(next.indexOf('info') + 1, 0, 'travel-fee')
      return next;
    });
    else setSteps(steps => {
      const next = [...steps]
      const indexOfTravelFee = next.indexOf('travel-fee')
      if (indexOfTravelFee != -1) next.splice(indexOfTravelFee, 1)
      return next
    })
  }, [offsite, setSteps])

  const finish = async () => {
    console.log({
      name: businessName,
      address: businessAddress,
      onsite,
      offsite,
      travel_distance: travelDistance,
      travel_policy: travelPolicy,
      working_hours: workingHours,
      services
    });
    await functionsCreateBusiness({
      name: businessName,
      address: businessAddress,
      onsite,
      offsite,
      travel_distance: travelDistance,
      travel_policy: travelPolicy,
      working_hours: workingHours,
      services
    })
    navigate('/')
  }

  useEffect(() => {
    navigate(steps[step])
  }, [])

  const context = {
    businessName: [businessName, setBusinessName],
    businessAddress: [businessAddress, setBusinessAddress],
    onsite: [onsite, setOnsite],
    offsite: [offsite, setOffsite],
    travelDistance: [travelDistance, setTravelDistance],
    travelPolicy: [travelPolicy, setTravelPolicy],
    workingHours: [workingHours, setWorkingHours],
    services: [services, setServices],
    changeStep, finish,
    step, steps
  }

  return (
    <NewBusinessContext.Provider value={context}>
      <Outlet />
    </NewBusinessContext.Provider>
  )
}

export default NewBusinessProvider