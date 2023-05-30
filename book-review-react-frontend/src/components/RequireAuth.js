import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useToken from "../hooks/useToken";

const RequireAuth = () => {
  // const { auth } = useAuth();
  const location = useLocation();
  const { token } = useToken();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
