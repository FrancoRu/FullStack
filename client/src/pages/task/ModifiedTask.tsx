import { SubmitHandler, useForm } from "react-hook-form";
import { ModifiedTask } from "../../types/task";
import { useTask } from "../../context/task/useTask.Context";
import { useNavigate } from "react-router-dom";
import { filteredData } from "../../libs/transformData";
import Input from "../../component/Input";
import { Importance, State } from "../../types/types.d";
import { Button } from "../../component/Button";
import { useError } from "../../context/error/useError.Context";
import Form from "react-bootstrap/Form";
import { useProject } from "../../context/project/useProject.Context";

function ModifiedTask() {
  const { register, handleSubmit } = useForm<ModifiedTask>();
  const { selectTask, modifiedTask, isFinished } = useTask();
  const { modifiedUpdateProject } = useProject();
  const navigate = useNavigate();
  const { setError } = useError();

  // if (selectTask) navigate("/project");
  const onSubmit: SubmitHandler<ModifiedTask> = async (data) => {
    const cleanedData: ModifiedTask = filteredData(data);
    try {
      await modifiedTask(cleanedData);

      if (cleanedData.state === State.Finished) {
        if (selectTask?.project)
          isFinished(selectTask.project) &&
            modifiedUpdateProject(selectTask.project, State.Finished);
      }

      if (cleanedData.state === State.Developing) {
        modifiedUpdateProject(selectTask?.project, State.Developing);
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
        <Form.Label hidden>
          Enter the new title of the task (Opcional):
        </Form.Label>
        <Input
          type="text"
          value={selectTask?.title}
          placeholder="Enter the new title of the task (Opcional)"
          name="title"
          register={register}
        />
        {/* </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the new description of the taks (optional):
        </Form.Label>
        <textarea
          defaultValue={selectTask?.description}
          placeholder="Enter the new description of the taks (optional)"
          {...register("description")}
        ></textarea>
        {/* </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the new Deadline of the task (optional):
        </Form.Label>
        <Input
          type="date"
          name="deadline"
          register={register}
          value={
            selectTask?.deadline
              ? new Date(selectTask.deadline).toISOString().split("T")[0]
              : ""
          }
        />
        {/* // </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the new importance of the task (optional):
        </Form.Label>
        <Form.Select
          {...register("importance")}
          defaultValue={selectTask?.Importance}
        >
          {Object.values(Importance).map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </Form.Select>
        {/* // </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the new state of the task (optional):
        </Form.Label>
        <Form.Select {...register("state")} defaultValue={selectTask?.state}>
          {Object.values(State).map((element) => (
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
            value="Modified"
            variant="outline-light"
          />
        </div>
        {/* </Row> */}
      </Form>
    </div>
  );
}

export default ModifiedTask;
