import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  //   const initialValues = {
  //     email: "",
  //     password: "",
  //   };
  //   const [values, setValues] = useState(initialValues);

  //   function handleInputChange(e) {
  //     const { name, value } = e.target;
  //     setValues({ ...values, [name]: value });
  //   }

  const email = useRef("");
  const password = useRef("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleForSubmit(e) {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const emailIsInValid = !emailValue.includes("@");
    const passwordIsInValid = passwordValue.length < 8;

    if (emailIsInValid) {
      setEmailError(true);
      return;
    }

    if (passwordIsInValid) {
      setPasswordError(true);
      return;
    }

    console.log(emailValue, passwordValue);

    email.current.value = "";
    password.current.value = "";
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card ${cardColor} border`}>
            <div className="card-header">
              <h1 className="h4 mb-0">Login</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleForSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    ref={email}
                    className="form-control"
                    name="email"
                    id="email"
                  />
                  {emailError && (
                    <div className="invalid-feedback d-block">
                      Please enter a valid email address.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    ref={password}
                    className="form-control"
                    name="password"
                    id="password"
                  />
                  {passwordError && (
                    <div className="invalid-feedback d-block">
                      Password must be at least 8 characters long.
                    </div>
                  )}
                </div>

                <button className={`btn btn-outline-${btnColor} border`}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
