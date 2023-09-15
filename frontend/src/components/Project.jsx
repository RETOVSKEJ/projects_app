import React from "react";
import ProjectDetails from "../pages/ProjectDetails";
import { useNavigate } from "react-router-dom";

export default function Project({ project }) {
  const navigate = useNavigate();

  return (
    <>
      <h5 className="font-bold text-xl">{project.title}</h5>
      <p className="text-gray-500">{project.status}</p>
      <p className="text-gray-500">{project.date_start}</p>
      <p className="text-gray-500">{project.date_end}</p>

      <button
        onClick={() =>
          navigate(`/projects/${project.id}`, { state: { project } })
        }
      >
        Details
      </button>
      <button
        onClick={() =>
          navigate(`/projects/edit/${project.id}`, { state: { project } })
        }
      >
        Edit
      </button>
    </>
  );
}
