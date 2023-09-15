import { useNavigate } from "react-router-dom";

function Navigation({ disableHistory, confirm, children }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <button onClick={() => navigate("/")}>
        {confirm ? "Anuluj" : "Home"}
      </button>
      {disableHistory ? null : (
        <button onClick={() => navigate(-1)}>Powrót</button>
      )}

      {children}
    </div>
  );
}

export default Navigation;
