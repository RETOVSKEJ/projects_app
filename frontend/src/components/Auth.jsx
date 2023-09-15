import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ setCurrentUser, registrationToggle }) {
  return (
    <div>
      <header>
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
