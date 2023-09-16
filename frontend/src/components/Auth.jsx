import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ registrationToggle }) {
  const { currentUser, setCurrentUser, fetchUser } = useContext(UserContext);

  return (
    <div>
      <header className="text-center mb-6">
        {registrationToggle ? <h2>Register</h2> : <h2>Log In</h2>}
      </header>
      {registrationToggle ? (
        <RegisterForm setCurrentUser={setCurrentUser} />
      ) : (
        <LoginForm setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}
