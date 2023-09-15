import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectForm from "./pages/ProjectForm";
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
  const [registrationToggle, setRegistrationToggle] = useState(false);

  const fetchUser = () => {
    client
      .get("/api/auth/user")
      .then((res) => setCurrentUser(res.data.user))
      .catch(() => setCurrentUser(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function handleLogout(ev) {
    client.post("/api/auth/logout", { withCredentials: true }).then((res) => {
      setCurrentUser(false);
      setRegistrationToggle(false);
    });
  }

  if (currentUser === undefined) return <Spinner />;

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, fetchUser }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleLogout={handleLogout}
                setRegistrationToggle={setRegistrationToggle}
                registrationToggle={registrationToggle}
              />
            }
          />
          <Route path="/user/edit" element={<UserEdit />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<ProjectForm />} />
          <Route path="/projects/edit/:id" element={<ProjectForm />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
