import { Link } from "react-router-dom";

function NotAuthenticated() {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Sign Up</Link>
    </>
  );
}

export default NotAuthenticated;
