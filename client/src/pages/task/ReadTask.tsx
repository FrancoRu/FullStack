import { useProject } from '../../context/project/useProject.Context'
import { useTask } from '../../context/task/useTask.Context'
import { CompleteViewProject } from '../../types/project'
import { CompleteViewTask } from '../../types/task'
import ButtonModifiedTask from './Buttons/ButtonModifiedTask'
import ButtonDeleteTask from './Buttons/ButtonsDeleteTask'

const ReadTasks: React.FC<{ id: string }> = ({ id }) => {
  const { projects } = useProject()

  const { tasks, firstCharge, getTasks } = useTask()

  if (firstCharge) {
    getTasks()
  }

  const selectProjects: CompleteViewProject | undefined = projects?.find(
    (element) => element._id === id
  )

  const tasksRead: CompleteViewTask[] | undefined = tasks?.filter(
    (element) => element.project === selectProjects?._id
  )

  return (
    <>
      {/* <h1>Project: {selectProjects?.nameproject}</h1> */}
      {tasksRead && tasksRead.length > 0 ? (
        <div className="w-100">
          {tasksRead.map((element) => (
            <div
              key={element._id}
              className="item-task w-100 d-flex column justify-content-between">
              <div className="row d-flex flex-wrap col-5">
                <p>
                  <strong>Title: </strong>
                  <span>{element.title}</span>
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
                  <span>
                    <strong>Deadline: </strong>
                    {new Date(element.deadline).toLocaleDateString('en-US')}
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Importance: </strong>
                    {element.importance}
                  </span>
                </p>
                <p>
                  <strong>State: </strong>
                  <span>{element.state}</span>
                </p>
              </div>
              <div className="col-3">
                <div className="dropdown">
                  <p className="custom-op"></p>
                  <div className="dropdown-content">
                    <ButtonModifiedTask id={element._id} />
                    <ButtonDeleteTask id={element._id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>Not found task</h1>
      )}
    </>
  )
}

export default ReadTasks
