import Navigation from "../components/Navigation";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useLocation } from "react-router-dom";

export default function ProjectDetails() {
  const { currentUser, setCurrentUser, fetchUser } = useContext(UserContext);
  const location = useLocation();
  const project = location.state.project;
  const disableHistory = location.state.disableHistory;

  return (
    <div className="flex flex-col gap-4">
      <Navigation disableHistory={disableHistory} />
      <h5>title: {project.title}</h5>
      <h5>creator: {project.creator}</h5>
      <p>desc: {project.description}</p>
      <p>status: {project.status}</p>
      <p>date start:{project.date_start}</p>
      <p>date end:{project.date_end}</p>
      <p>
        participants id:{" "}
        {project.participants.map((participant) => (
          <span key={participant}>{participant}, </span>
        ))}
      </p>
    </div>
  );
}
