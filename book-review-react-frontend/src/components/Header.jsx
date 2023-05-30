import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import useToken from "../hooks/useToken";

const Header = () => {
  const logout = useLogout();
  const { token } = useToken();
  const [userToken, setUserToken] = useState(token);

  // useEffect(() => {
  //   setUserToken(token);
  // }, [token]);

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-primary justify-content-between">
          <a className="navbar-brand main-heading text-white" href="/">
            &nbsp; &nbsp; Book Review App
          </a>
          {token === null ? (
            <div></div>
          ) : (
            <a
              href="/login"
              className="btn btn-primary navbar-btn text-white"
              onClick={logout}
            >
              Logout
            </a>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
