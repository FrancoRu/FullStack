import { SubmitHandler, useForm } from "react-hook-form";
import { ModifiedProject } from "../../types/project";
import Input from "../../component/Input";
import { Button } from "../../component/Button";
import { Importance } from "../../types/types.d";
import { useProject } from "../../context/project/useProject.Context";
import { useNavigate } from "react-router-dom";
import { filteredData } from "../../libs/transformData";
import { useError } from "../../context/error/useError.Context";
import Form from "react-bootstrap/Form";
function ModifiedProject() {
  const { register, handleSubmit } = useForm<ModifiedProject>();
  const { modifiedProject, selectProjects } = useProject();
  const navigate = useNavigate();
  const { setError } = useError();
  const onSubmit: SubmitHandler<ModifiedProject> = async (data) => {
    const cleanedData: ModifiedProject = filteredData(data);
    try {
      await modifiedProject(cleanedData);
      navigate("/project");
    } catch (error: unknown) {
      setError(error);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <Form
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 mt-5"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the new name of the project (optional):{" "}
        </Form.Label>
        <Input
          type="text"
          placeholder="Enter the new name of the project (optional)."
          name="nameproject"
          value={selectProjects?.nameproject}
          register={register}
        />
        {/* </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the new description of the project (optional):
        </Form.Label>
        <textarea
          defaultValue={
            selectProjects?.description
              ? selectProjects?.description
              : "No description"
          }
          placeholder="Enter the new description of the project (optional)"
          {...register("description")}
        ></textarea>
        {/* </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the new Deadline of the project (optional):{" "}
        </Form.Label>
        <Input
          type="date"
          name="deadline"
          register={register}
          value={
            selectProjects?.deadline
              ? new Date(selectProjects.deadline).toISOString().split("T")[0]
              : ""
          }
        />
        {/* // </Row> */}
        {/* <Row className="mb-3"> */}
        <Form.Label hidden>
          Enter the new importance of the project (optional):
        </Form.Label>
        <Form.Select
          {...register("importance")}
          defaultValue={selectProjects?.importance}
        >
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
            value="Modified"
            variant="outline-light"
          />
        </div>
        {/* </Row> */}
      </Form>
    </div>
  );
}

export default ModifiedProject;
