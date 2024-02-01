import { useEffect, useState } from 'react'
import FromTo from './FromTo'

function Breaks({ onChange, defaultBreaks }) {
  const [breaks, setBreaks] = useState(defaultBreaks)

  const deleteBreak = (i) => {
    setBreaks(breaks => {
      breaks.splice(i, 1);
      return breaks;
    })
    console.log('deleteBreak');
  }
  useEffect(() => {
    console.log(breaks);
    onChange(breaks)
  }, [breaks, onChange])

  function Break({ i, from, to }) {
    return (
      <div className='break'>
        <FromTo from={from} to={to} />
        <input type="image" src="../../x.png" onClick={() => { deleteBreak(i) }} />
      </div>
    )
  }

  return (
    <>
      {
        breaks.map((b, i) => <Break key={i} i={i} from={b.from} to={b.to} />)
      }
      <div className='break'>
        <button className='add-list-item'>
          <img src="../../x.png" alt="+" />
          Add Break
        </button>
      </div>
    </>
  )
}

export default Breaks