import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import useInput from "../hooks/useInput";
import Input from "../components/Input";
import { hasMinLength, isEmail, isNotEmpty } from "../utils/validations";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const {
    value: emailValue,
    hasError: emailHasError,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    hasError: passwordHasError,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
  } = useInput("", (value) => hasMinLength(value, 8));

  function handleForSubmit(e) {
    e.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }
    console.log(emailValue, passwordValue);
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
              <form onSubmit={handleForSubmit}>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  labelText="Email"
                  error={
                    emailHasError
                      ? "Please enter a valid email address."
                      : undefined
                  }
                  value={emailValue}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />

                <Input
                  id="password"
                  type="password"
                  name="password"
                  labelText="Password"
                  error={
                    passwordHasError
                      ? "Password must be at least 8 characters long."
                      : undefined
                  }
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                />

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
