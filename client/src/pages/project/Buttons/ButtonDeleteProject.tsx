import { useProject } from "../../../context/project/useProject.Context";
import { Button } from "../../../component/Button";
import { useTask } from "../../../context/task/useTask.Context";

type props = {
  id: string;
};

function ButtonDeleteProject(prop: props) {
  const { removeSelectProject } = useProject();
  const { removeTaskByProjectId } = useTask();
  const handlerClick = (index: string) => {
    removeSelectProject(index);
    removeTaskByProjectId(index);
  };
  return (
    <Button
      type="submit"
      value="Delete Project"
      classname="w-100"
      variant="outline-danger"
      handler={() => handlerClick(prop.id)}
    />
  );
}
export default ButtonDeleteProject;
