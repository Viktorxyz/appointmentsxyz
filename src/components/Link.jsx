import { Link as RouterLink } from 'react-router-dom';

function Link({ children, to }) {
  return (
    <RouterLink to={to} className='link'>
      {children}
    </RouterLink>
  )
}

export default Link