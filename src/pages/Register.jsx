import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Register() {
  const [errors, setErrors] = useState({});
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  function handleForSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const hobbies = formData.getAll("hobbies");
    const data = Object.fromEntries(formData.entries());
    data.hobbies = hobbies;

    let newErrors = {};

    if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(data);
      e.target.reset();
    }
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card ${cardColor} border`}>
            <div className="card-header">
              <h1 className="h4 mb-0">Register</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleForSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3 position-relative">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        name="password"
                        id="password"
                        required
                      />
                      {errors.password && (
                        <div
                          className="invalid-feedback d-block position-absolute"
                          style={{ fontSize: "0.75rem", bottom: "-20px" }}
                        >
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3 position-relative">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                      />
                      {errors.confirmPassword && (
                        <div
                          className="invalid-feedback d-block position-absolute"
                          style={{ fontSize: "0.75rem", bottom: "-20px" }}
                        >
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="hobbies"
                      className={`form-check-label text-${btnColor}`}
                    >
                      Hobbies
                    </label>
                    <div className="card card-body bg-white border">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="cars"
                          value="cars"
                          className="form-check-input"
                        />
                        <label
                          htmlFor="cars"
                          className="form-check-label text-dark"
                        >
                          Cars
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="books"
                          value="books"
                          className="form-check-input"
                        />
                        <label
                          htmlFor="books"
                          className="form-check-label text-dark"
                        >
                          Books
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="movies"
                          value="movies"
                          className="form-check-input"
                        />
                        <label
                          htmlFor="movies"
                          className="form-check-label text-dark"
                        >
                          Movies
                        </label>
                      </div>
                    </div>
                  </div>
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
