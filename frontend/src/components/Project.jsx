import React from "react";
import ProjectDetails from "../pages/ProjectDetails";
import { useNavigate } from "react-router-dom";

export default function Project({ project }) {
  const navigate = useNavigate();

  return (
    <>
      <h5 className="font-bold  sm:text-xl">{project.title}</h5>
      <p className="text-gray-500 text-sm sm:text-base">{project.status}</p>
      <p className="text-gray-500 text-sm sm:text-base">{project.date_start}</p>
      <p className="text-gray-500 text-sm sm:text-base">{project.date_end}</p>
      <div className="ml-auto">
        <button
          className="w-full text-gray-300 p-auto text-sm sm:text-base"
          onClick={() =>
            navigate(`/projects/${project.id}`, { state: { project } })
          }
        >
          Details
        </button>
        <button
          className="w-full text-gray-300 p-auto text-sm sm:text-base"
          onClick={() =>
            navigate(`/projects/edit/${project.id}`, { state: { project } })
          }
        >
          Edit
        </button>
      </div>
    </>
  );
}
