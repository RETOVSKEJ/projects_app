import { useNavigate } from "react-router-dom";

function Navigation({ disableHistory, confirm, children }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 mt-4 mb-8 sm:gap-6 md:px-6 sm:flex-row sm:justify-center">
      <button className="w-full md:w-1/4" onClick={() => navigate("/")}>
        {confirm ? "Anuluj" : "Home"}
      </button>
      {disableHistory ? null : (
        <button className="w-full md:w-1/4" onClick={() => navigate(-1)}>
          Powrót
        </button>
      )}
      {children}
    </div>
  );
}

export default Navigation;
