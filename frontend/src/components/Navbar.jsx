export default function Navbar({
  handleLogout,
  currentUser,
  registrationToggle,
  setRegistrationToggle,
}) {
  return (
    <nav className="justify-end items-center gap-4 fixed top-0 left-0 right-0 flex">
      {!!currentUser ? (
        <>
          <p>You're Logged in as {currentUser.email} !</p>
          <button onClick={() => handleLogout()}>Log out</button>
        </>
      ) : registrationToggle ? (
        <button onClick={() => setRegistrationToggle(false)}>Login</button>
      ) : (
        <button onClick={() => setRegistrationToggle(true)}>Register</button>
      )}
    </nav>
  );
}
