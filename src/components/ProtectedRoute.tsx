import { Navigate, Outlet } from "react-router"
import { getToken } from "../utils/tokenUtils"


const ProtectedRoute = () => {
    if (!getToken()) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
    
}

export default ProtectedRoute