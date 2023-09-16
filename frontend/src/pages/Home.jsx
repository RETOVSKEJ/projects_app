import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import Navbar from "../Components/Navbar";
import Auth from "../components/Auth";
import Spinner from "../Components/Spinner";
import RouteNavigation from "../components/RouteNavigation";

import { client } from "../App";

export default function Home({ registrationToggle }) {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, setCurrentUser, fetchUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <main>
      {currentUser ? (
        <RouteNavigation />
      ) : (
        <Auth
          setCurrentUser={setCurrentUser}
          registrationToggle={registrationToggle}
        />
      )}
    </main>
  );
}
