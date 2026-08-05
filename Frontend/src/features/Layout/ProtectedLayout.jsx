
import Protected from '../Auth/components/Protected'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = ({allowedRoles}) => {
  return (
    <Protected allowedRoles={allowedRoles}>
        <Outlet/>
    </Protected>
  )
}

export default ProtectedLayout