import { Link } from 'react-router-dom'
import FromTo from '../FromTo'
import './style.css'

function DayBreaks({ breaks }) {
  function ListItemBreak({ b, index }) {
    return (
      <Link className='list-item-break' to={`breaks/${index}`}>
        <FromTo from={b.from} to={b.to} />
      </Link>
    )
  }

  return (
    <div className='list-day-breaks list'>
      {breaks.map((b, i) => <ListItemBreak key={i} b={b} index={i} />)}
      <Link className='list-item-break' to={`breaks/${breaks.length}`}>
        Add break
      </Link>
    </div>
  )
}

export default DayBreaks