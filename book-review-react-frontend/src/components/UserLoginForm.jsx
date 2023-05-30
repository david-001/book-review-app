import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useToken from "../hooks/useToken";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SPRINGBOOT_SERVER_URL from "../Constants";
import { axios } from "../Constants";

const UserLoginForm = () => {
  const LOGIN_URL = SPRINGBOOT_SERVER_URL + "api/users/login";
  const { setAuth } = useAuth();
  const { setToken } = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/mybooks";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: pwd,
    };
    axios
      .post(LOGIN_URL, user)
      .then((response) => {
        const token = response?.data?.token;
        setAuth({ email, pwd, token });
        setToken({ token });
        setEmail("");
        setPwd("");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing email or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  return (
    <div>
      <section className="section-bg">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              autoComplete="off"
              value={email}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary navbar-btn text-white w-100 p-2"
          >
            Login
          </button>
        </form>
        <p>
          <br />
          <span>
            <Link to="/">Don't have an account?</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default UserLoginForm;
