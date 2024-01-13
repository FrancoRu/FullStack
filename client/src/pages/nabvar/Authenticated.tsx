import { Link } from "react-router-dom";
import Panel from "../panel/Panel";
import Profile from "../panel/Profile";

function Authenticated() {
  return (
    <>
      <Panel />
      <Link to={"/project"}> project</Link>
      {/* <Button
        type="submit"
        variant="outline-success"
        handler={() => handlerClick('/project')}
        value="project"
      /> */}
      <Profile />
    </>
  );
}

export default Authenticated;
