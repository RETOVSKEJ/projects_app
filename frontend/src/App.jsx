import { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectPreview from "./pages/ProjectPreview";
import ProjectFormPage from "./pages/ProjectFormPage";
import ProjectDetails from "./pages/ProjectDetails";
import UserEdit from "./pages/UserEdit";
import Spinner from "./Components/Spinner";
import Navbar from "./Components/Navbar";
import UserEditPreview from "./pages/UserEditPreview";

axios.defaults.xsrfCookieName = "csrftoken"; // matching to django
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const client = axios.create({
  // dzieki temu nie musimy powtarzac z kazdym rquestem
  baseURL: "http://127.0.0.1:8000", // django
});

function App() {
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  function handleLogout(ev) {
    client.post("/api/auth/logout", { withCredentials: true }).then((res) => {
      setCurrentUser(false);
      setRegistrationToggle(false);
    });
  }

  const fetchUser = () => {
    client
      .get("/api/auth/user")
      .then((res) => setCurrentUser(res.data))
      .catch(() => setCurrentUser(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // NOT AUTHENTICATED
    if (currentUser === false) {
      navigate("/");
    }
  }, [currentUser]);

  if (currentUser === undefined) return <Spinner />;

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, fetchUser }}>
        <Navbar
          handleLogout={handleLogout}
          setRegistrationToggle={setRegistrationToggle}
          registrationToggle={registrationToggle}
          currentUser={currentUser}
        />
        <Routes>
          <Route
            path="/"
            element={<Home registrationToggle={registrationToggle} />}
          />
          <Route path="/user/edit" element={<UserEdit />} />
          <Route path="/user-edit-preview" element={<UserEditPreview />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<ProjectFormPage />} />
          <Route path="/projects/edit/:id" element={<ProjectFormPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/project-preview" element={<ProjectPreview />} />
          <Route
            path="*"
            element={<Home registrationToggle={registrationToggle} />}
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
