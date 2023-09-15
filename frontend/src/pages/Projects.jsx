import React from "react";
import Navigation from "../components/Navigation";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Project from "../components/Project";

import { client } from "../App";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const { currentUser, setCurrentUser, fetchUser } = useContext(UserContext);

  useEffect(() => {
    client
      .get("/api/projects/")
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Navigation />
      {projects.map((project) => (
        <div key={project.id} className="flex w-1/2 gap-4">
          <Project project={project} />
        </div>
      ))}
    </div>
  );
}
