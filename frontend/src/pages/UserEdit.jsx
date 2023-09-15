import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import Navigation from "../components/Navigation";
import EditForm from "../components/EditForm";

export default function UserEdit() {
  const { currentUser, setCurrentUser, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <EditForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Navigation />
    </>
  );
}
