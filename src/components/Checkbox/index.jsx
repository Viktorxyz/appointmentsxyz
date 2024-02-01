import './style.css'

function Checkbox({ label, onChange, ...props }) {
  return (
    <label className='checkbox'>
      <input
        {...props}
        type="checkbox"
        onChange={(e) => { onChange(e.target.checked) }}
      />
      <span></span>
      {label}
    </label>
  )
}

export default Checkbox