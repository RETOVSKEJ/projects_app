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
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="">
      <Navigation />
      <div className="flex flex-col gap-4 xl:mx-auto xl:w-1/2">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="flex gap-4 sm:gap-6">
              <Project project={project} />
            </div>
          ))
        ) : (
          <h2 className="text-center text-2xl">
            No projects for this account...
          </h2>
        )}
      </div>
    </main>
  );
}
