import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectFormPage from "./pages/ProjectFormPage";
import ProjectDetails from "./pages/ProjectDetails";
import UserEdit from "./pages/UserEdit";
import Spinner from "./Components/Spinner";

axios.defaults.xsrfCookieName = "csrftoken"; // matching to django
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const client = axios.create({
  // dzieki temu nie musimy powtarzac z kazdym rquestem
  baseURL: "http://127.0.0.1:8000", // django
});

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  const fetchUser = () => {
    client
      .get("/api/auth/user")
      .then((res) => setCurrentUser(res.data))
      .catch(() => setCurrentUser(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, fetchUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/edit" element={<UserEdit />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<ProjectFormPage />} />
          <Route path="/projects/edit/:id" element={<ProjectFormPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
