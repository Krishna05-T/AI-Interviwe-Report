import { Navigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import Loading from "./Loading";

const ProtectedRoute = ({children}) => {
    const { loading, user } = useAuth();

    if(loading) {
        return (
            <Loading />
        )
    }

    if(!user) {
       return <Navigate to={"/login"} />
    }

    return children
}

export default ProtectedRoute;