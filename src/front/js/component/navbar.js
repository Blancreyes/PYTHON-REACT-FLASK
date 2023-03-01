import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </Link>
          <Link to="/single">
            <button className="btn btn-primary ms-2">Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
