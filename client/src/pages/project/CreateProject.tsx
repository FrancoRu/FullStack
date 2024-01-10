import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../component/Input'
import { Button } from '../../component/Button'
import { Importance } from '../../types/types.d'
import { CreateProject } from '../../types/project'
import { useProject } from '../../context/project/useProject.Context'
import { useError } from '../../context/error/useError.Context'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
function CreateProject() {
  const { register, handleSubmit } = useForm<CreateProject>()
  const { addProject } = useProject()
  const { setError } = useError()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<CreateProject> = async (data) => {
    try {
      await addProject(data)
      navigate('/project')
    } catch (error: unknown) {
      setError(error)
    }
  }

  return (
    <div className="w-100 d-flex justify-content-center">
      <Form
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 mt-5"
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Label>Imgress the project name: </Form.Label>
          <Input
            type="text"
            placeholder="Ingress the project name."
            name="nameproject"
            required
            register={register}
          />
        </Row>
        <Row className="mb-3">
          <Form.Label> Ingress the Description of the project</Form.Label>
          <textarea
            placeholder="Ingress the Description of the project."
            {...register('description')}></textarea>
        </Row>
        <Row className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Input
            type="date"
            name="deadline"
            value={new Date().toISOString().split('T')[0]}
            required
            register={register}
          />
        </Row>
        <Row className="mb-3">
          <Form.Label>Importance</Form.Label>
          <Form.Select {...register('importance', { required: true })}>
            {Object.values(Importance).map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </Form.Select>
        </Row>
        <Row className="mb-3 d-flex justify-content-center">
          <Button
            type="submit"
            classname="col-6"
            value="Create"
            variant="outline-success"
          />
        </Row>
      </Form>
    </div>
  )
}

export default CreateProject
