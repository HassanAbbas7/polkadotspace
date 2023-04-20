import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated, isSuperUser } from '.'

export default function PrivateOutlet() {
    const isauthenticated = isAuthenticated();
    const issuperUser = isSuperUser();

    if(isauthenticated && issuperUser){
        return <Outlet /> 
    }
    return <Navigate to="/" />
}
