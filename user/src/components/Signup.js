import React from "react";
import "./Signup.css";

function Signup() {
  return (
    <>
      <div className="container-fluid shadow p-3 mb-5 bg-body-secondary rounded bg-secondary mt-4">
        <form className="row">
          <div className="col-5 text-start">
            <label
              for="inputEmail4"
              className="fw-bold text-decoration-underline text-danger"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control col-4 align-middle"
              id="inputEmail4"
            />
          </div>
          <div className="col-12 mx-2">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary rounded-2">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
