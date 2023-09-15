import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <button onClick={() => navigate("/")}>Powrót</button>
    </div>
  );
}

export default Navigation;
