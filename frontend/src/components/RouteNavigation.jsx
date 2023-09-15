import { useNavigate } from "react-router-dom";

function RouteNavigation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/user/edit")}>Edit User</button>
      <button onClick={() => navigate("/projects")}>Projects List</button>
      <button onClick={() => navigate("/projects/create")}>
        Create Project
      </button>
    </div>
  );
}

export default RouteNavigation;
