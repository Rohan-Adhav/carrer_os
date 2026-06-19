import { useAuth } from "../context/AuthContext.jsx";
import { Outlet,Navigate} from "react-router-dom";


export default function ProtectedRoutes(){
    const {user,token} = useAuth()

    return token ? <Outlet/> : <Navigate to="/login" replace/> 
}