import './style.css'

function UserProfile({ user }) {
  return (
    <div className='user'>
      <div className='user__profile-image-wrapper'>
        <div className='user__profile-image'>
          <h1>{user.username.charAt(0).toUpperCase()}</h1>
        </div>
      </div>
      <div className='user__username'><h2>{user.username}</h2></div>
      <div className='user__roles'>{user?.roles?.join(", ")}</div>
    </div>
  )
}

export default UserProfile