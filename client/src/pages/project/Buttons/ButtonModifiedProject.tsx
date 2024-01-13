import { useNavigate } from "react-router-dom";
import { useProject } from "../../../context/project/useProject.Context";
import { Button } from "../../../component/Button";

type props = {
  id: string;
};

function ButtonModifiedProject(prop: props) {
  const navigate = useNavigate();
  const { setSelectProject } = useProject();
  const handlerClick = (index: string) => {
    setSelectProject(index);
    navigate("/project/modified");
  };
  return (
    <Button
      type="submit"
      classname="w-100"
      value="Modified Project"
      variant="outline-light"
      handler={() => handlerClick(prop.id)}
    />
  );
}
export default ButtonModifiedProject;
