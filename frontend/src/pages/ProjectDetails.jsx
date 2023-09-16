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
    <main className="w-full">
      <Navigation disableHistory={disableHistory} />
      <div className="confirm-wrapper">
        <h2>Project Details</h2>
        <p>
          <strong>Title:</strong> {project.title}
        </p>
        <p>
          <strong>Creator:</strong> {project.creator}
        </p>
        <p>
          <strong className="mb-auto">Description:</strong>{" "}
          <span className="pl-2 text-end">{project.description}</span>
        </p>
        <p>
          <strong>Status:</strong> {project.status}
        </p>
        <p>
          <strong>Date Start:</strong>{" "}
          {new Date(project.date_start).toLocaleDateString("en-GB")}
        </p>
        <p>
          <strong>Date End:</strong>{" "}
          {new Date(project.date_end).toLocaleDateString("en-GB")}
        </p>
        <p>
          <strong>Participants ID:</strong>{" "}
          {project.participants.map((participant, index, array) => (
            <span className={index === 0 ? "ml-auto" : null} key={participant}>
              {participant}
              {index !== array.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    </main>
  );
}
