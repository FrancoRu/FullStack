import { useProject } from '../../context/project/useProject.Context'
import ButtonModifiedProject from './Buttons/ButtonModifiedProject'
import ButtonDeleteProject from './Buttons/ButtonDeleteProject'
import ButtonAddTasksProject from './Buttons/ButtonAddTaskProject'
import { Button } from '../../component/Button'
import { useNavigate } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import ReadTasks from '../task/ReadTask'

const ReadProjects: React.FC = () => {
  const { projects, firstCharge, getProjects } = useProject()
  const navigate = useNavigate()

  if (firstCharge) {
    getProjects()
  }

  const handlerClick = () => {
    navigate('/project/add')
  }

  return (
    <>
      <div className="w-100 d-flex justify-content-center">
        <Button
          type="submit"
          value="Add Project"
          variant="outline-success"
          classname="col-xl-2 co-lg-3 col-md-5 col-sm-7 mt-5"
          handler={() => handlerClick()}
        />
      </div>
      {projects && (
        <div className="mt-5 ">
          <Accordion>
            {projects.map((element, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>
                  <div className="item-project w-100 d-flex column justify-content-between">
                    <div className=" row d-flex flex-wrap col-5">
                      <p className="information">
                        <strong>Project name: </strong>
                        <span>{element.nameproject}</span>
                      </p>
                      <p>
                        <strong>Description: </strong>
                        <span>
                          {element.description
                            ? element.description
                            : 'Sin descripcion'}
                        </span>
                      </p>
                    </div>
                    <div className="row d-flex flex-wrap col-3">
                      <p>
                        <strong>Deadline: </strong>
                        <span>
                          {new Date(element.deadline).toLocaleDateString(
                            'en-US'
                          )}
                        </span>
                      </p>
                      <div>
                        <p>
                          <strong>Importance: </strong>
                          <span>{element.importance}</span>
                        </p>
                        <p>
                          <strong>State: </strong>
                          <span>{element.state}</span>
                        </p>
                      </div>
                    </div>
                    <div className="row d-flex flex-wrap col-2 col-md-3 col-sm-3 mx-1">
                      <div className="d-flex justify-content-center align-items-center p-1">
                        <ButtonAddTasksProject id={element._id} />
                      </div>
                      <div className="d-flex justify-content-center align-items-center p-1">
                        <ButtonModifiedProject id={element._id} />
                      </div>
                      <div className="d-flex justify-content-center align-items-center p-1">
                        <ButtonDeleteProject id={element._id} />
                      </div>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <ReadTasks id={element._id} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      )}
    </>
  )
}

export default ReadProjects
