import './style.css'

function AddListItem({ onClick, label }) {
  return (
    <div className='list-item'>
      <button className='add-list-item' onClick={onClick}>
        <img src="../../../x.png" alt="+" />
        {label}
      </button>
    </div>
  )
}
export default AddListItem