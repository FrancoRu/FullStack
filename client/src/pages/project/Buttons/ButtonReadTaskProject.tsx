import { useNavigate } from 'react-router-dom'
import { useProject } from '../../../context/project/useProject.Context'
import { Button } from '../../../component/Button'

type props = {
  id: string
}

function ButtonReadTasksProject(prop: props) {
  const navigate = useNavigate()
  const { setSelectProject } = useProject()
  const handlerClick = (index: string) => {
    setSelectProject(index)
    navigate('/project/readTask')
  }
  return (
    <Button
      type="submit"
      value="Read task"
      variant="outline-success"
      handler={() => handlerClick(prop.id)}
    />
  )
}

export default ButtonReadTasksProject
