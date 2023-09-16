import { useNavigate } from "react-router-dom";

function RouteNavigation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <button className="w-full text-xl" onClick={() => navigate("/user/edit")}>
        Edit User
      </button>
      <button className="w-full text-xl" onClick={() => navigate("/projects")}>
        Projects List
      </button>
      <button
        className="w-full text-xl"
        onClick={() => navigate("/projects/create")}
      >
        Create Project
      </button>
    </div>
  );
}

export default RouteNavigation;
