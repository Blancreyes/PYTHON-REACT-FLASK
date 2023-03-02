import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  function logOut() {
    let loggedOut = actions.logout();
    if (loggedOut) {
      navigate("/");
    }
  }

  return (
    <div className="container">
      <h1>Your Profile</h1>
      <br />

      <button className="btn btn-primary" onClick={logOut}>
        Log me out
      </button>
    </div>
  );
};
