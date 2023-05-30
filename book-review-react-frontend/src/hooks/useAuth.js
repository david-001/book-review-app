import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";
import useToken from "../hooks/useToken";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { token } = useToken();

  useDebugValue(auth, (auth) => (auth?.token ? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
};

export default useAuth;
