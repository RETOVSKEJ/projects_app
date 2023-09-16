export default function Navbar({
  handleLogout,
  currentUser,
  registrationToggle,
  setRegistrationToggle,
}) {
  return (
    <nav className="w-full py-1 items-center gap-4 relative flex">
      {!!currentUser ? (
        <>
          <p className="ml-auto">Hello {currentUser.email} !</p>
          <button onClick={() => handleLogout()}>Log out</button>
        </>
      ) : registrationToggle ? (
        <button
          className="md:ml-auto"
          onClick={() => setRegistrationToggle(false)}
        >
          Login
        </button>
      ) : (
        <button
          className="md:ml-auto"
          onClick={() => setRegistrationToggle(true)}
        >
          Register
        </button>
      )}
    </nav>
  );
}
