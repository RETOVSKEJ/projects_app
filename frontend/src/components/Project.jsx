import React from "react";
import ProjectDetails from "../pages/ProjectDetails";
import { useNavigate } from "react-router-dom";

export default function Project({ project }) {
  const navigate = useNavigate();

  return (
    <>
      <h5 className="font-bold text-xl">{project.title}</h5>
      <button
        onClick={() =>
          navigate(`/projects/${project.id}`, { state: { project } })
        }
      >
        Details
      </button>
    </>
  );
}
