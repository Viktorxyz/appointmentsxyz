import { useEffect, useRef } from 'react';
import './style.css'

function LoopScroll({ children, onChange, defaultIndex }) {
  const ref = useRef()
  const handleScroll = (e) => {
    const rowHeight = e.target.clientHeight / 3;
    if (Math.ceil(e.target.scrollTop) <= 0) {
      e.target.scrollTop = e.target.scrollHeight - e.target.clientHeight - rowHeight;
    } else if (e.target.scrollHeight - e.target.clientHeight <= Math.ceil(e.target.scrollTop)) {
      e.target.scrollTop = rowHeight;
    }
    if (Math.floor(Math.ceil(e.target.scrollTop) % rowHeight) == 0 || Math.floor(rowHeight - Math.ceil(e.target.scrollTop) % rowHeight) == 0) {
      onChange(Math.round(Math.ceil(e.target.scrollTop) / rowHeight - 1));
    }
  }

  useEffect(() => {
    if (defaultIndex != null) {
      ref.current.children[defaultIndex + 2].scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' })
    }
  }, [])

  return (
    <div className='loop-scroll' onScroll={handleScroll} ref={ref}>
      {children[children.length - 2]}
      {children[children.length - 1]}
      {children}
      {children[0]}
      {children[1]}
    </div>
  )
}

export default LoopScroll