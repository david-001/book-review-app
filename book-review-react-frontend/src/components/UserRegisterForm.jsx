import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axios } from "../Constants";
import SPRINGBOOT_SERVER_URL from "../Constants";
import { Link } from "react-router-dom";

//Validate user inputs. USER_REGEX start with lower or upper case letter, followed by 2 to 23 characters - letter,digits,- or _
const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
// PWD_REGEX - at least one lowercase letter, one uppercase letter, one digit and one special character
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const REGISTER_URL = SPRINGBOOT_SERVER_URL + "api/users/register";

const UserRegisterForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Set focus to username field when the component loads. Only happens when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Anytime username changes,check for validation
  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  //anytime password and match password changes check for validity
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [userName, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(userName);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    let user = {
      userName: userName,
      email: email,
      password: pwd,
    };
    axios
      .post(REGISTER_URL, user)
      .then((response) => {
        setSuccess(true);
        //clear state and controlled inputs
        //need value attrib on inputs for this
        setUserName("");
        setEmail("");
        setPwd("");
        setMatchPwd("");
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else {
          setErrMsg("Registration Failed");
        }
        errRef.current.focus();
      });
  };

  return (
    <div>
      {success ? (
        <section className="section-bg">
          <h1>Success!</h1>
          <p>
            <a href="/login">Login</a>
          </p>
        </section>
      ) : (
        <section className="section-bg">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <h1>Create your account</h1>
            <div className="form-group">
              <label htmlFor="username">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validUserName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validUserName || !userName ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && userName && !validUserName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                3 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="emailnote"
                className={
                  emailFocus && !validEmail ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                6 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                className="form-control"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>

            <button
              className="btn btn-primary navbar-btn text-white w-100 p-2"
              disabled={
                !validUserName || !validEmail || !validPwd || !validMatch
                  ? true
                  : false
              }
            >
              Create account
            </button>
          </form>
          <br />
          <span>
            <Link to="/login">Already have an account?</Link>
          </span>
        </section>
      )}
    </div>
  );
};

export default UserRegisterForm;
