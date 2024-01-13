import { useNavigate } from "react-router-dom";
import { useProject } from "../../../context/project/useProject.Context";
import { Button } from "../../../component/Button";

type props = {
  id: string;
};

function ButtonAddTasksProject(prop: props) {
  const navigate = useNavigate();
  const { setSelectProject } = useProject();
  const handlerClick = (index: string) => {
    setSelectProject(index);
    navigate("/project/addtask");
  };
  return (
    <Button
      type="submit"
      value="Add task"
      classname="w-100"
      variant="outline-light"
      handler={() => handlerClick(prop.id)}
    />
  );
}
export default ButtonAddTasksProject;
