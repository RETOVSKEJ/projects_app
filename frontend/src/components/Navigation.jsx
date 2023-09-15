import { useNavigate } from "react-router-dom";

function Navigation({ confirm }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <button onClick={() => navigate("/")}>
        {confirm ? "Anuluj" : "Home"}
      </button>
      <button onClick={() => navigate(-1)}>Powrót</button>
    </div>
  );
}

export default Navigation;
