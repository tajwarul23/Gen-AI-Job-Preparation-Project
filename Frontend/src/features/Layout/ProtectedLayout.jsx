
import Protected from '../Auth/components/Protected'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  return (
    <Protected>
        <Outlet/>
    </Protected>
  )
}

export default ProtectedLayout