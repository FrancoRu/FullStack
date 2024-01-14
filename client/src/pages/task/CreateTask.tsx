import { useNavigate } from "react-router-dom";
import { useProject } from "../../context/project/useProject.Context";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTask } from "../../context/task/useTask.Context";
import Input from "../../component/Input";
import { Importance, State } from "../../types/types.d";
import { Button } from "../../component/Button";
import { CreateTask } from "../../types/task.d";
import { useError } from "../../context/error/useError.Context";
import Form from "react-bootstrap/Form";

function CreateTask() {
  const { register, handleSubmit } = useForm<CreateTask>();
  const { selectProjects, modifiedUpdateProject } = useProject();
  const { addTask } = useTask();
  const navigate = useNavigate();
  const { setError } = useError();
  if (selectProjects === null) navigate("/project");

  const onSubmit: SubmitHandler<CreateTask> = async (data) => {
    const newData: CreateTask = { ...data, project: selectProjects?._id };
    try {
      await addTask(newData);
      if (selectProjects?.state) {
        selectProjects.state === State.Finished &&
          modifiedUpdateProject(selectProjects._id, State.Developing);
      }
      navigate("/project");
    } catch (error: unknown) {
      setError(error);
    }
  };
  return (
    <div className="w-100 d-flex justify-content-center">
      <Form
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>Enter the title of the task:</Form.Label>
        <Input
          type="text"
          placeholder="Enter the title of the task."
          name="title"
          required
          register={register}
        />
        {/* </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the description of the task (Optional):
        </Form.Label>
        <textarea
          placeholder="Enter the description of the task."
          {...register("description")}
        ></textarea>
        {/* </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>Enter the deadline of the task: </Form.Label>
        <Input
          type="date"
          value={new Date().toISOString().split("T")[0]}
          name="deadline"
          required
          register={register}
        />
        {/* // </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>Enter the importance of the task: </Form.Label>
        <Form.Select {...register("importance")}>
          {Object.values(Importance).map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </Form.Select>
        {/* // </Row> */}
        {/* <Row className="mb-3 d-flex justify-content-center"> */}
        <div className="container-button">
          <Button
            type="submit"
            classname="col-6"
            value="Create"
            variant="outline-light"
          />
        </div>
        {/* </Row> */}
      </Form>
    </div>
  );
}

export default CreateTask;
