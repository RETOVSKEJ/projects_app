import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import Navigation from "../components/Navigation";
import UserForm from "../components/UserForm";

export default function UserEdit() {
  const { currentUser, setCurrentUser, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main>
      <Navigation />
      <UserForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </main>
  );
}
