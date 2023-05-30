import useAuth from "./useAuth";
import useToken from "../hooks/useToken";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { setToken } = useToken();

  const logout = () => {
    setAuth({});
    setToken(null);
    localStorage.clear();
  };

  return logout;
};

export default useLogout;
