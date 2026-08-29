import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user ,loading} = useSelector(state=>state.auth);
    

      if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }


     if (!user || user.role !== "recruiter") {
        return <Navigate to="/" replace />;
    }

    return children
        
        
        
    
};
export default ProtectedRoute;