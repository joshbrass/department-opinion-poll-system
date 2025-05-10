import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean; 
  isAdmin?: boolean;        
  requireAdmin?: boolean;
  children?: React.ReactNode; 
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  isAdmin = false,
  requireAdmin = false,
  children
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/poll-list" replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;