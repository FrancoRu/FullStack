import { useNavigate } from 'react-router-dom'
import { useTask } from '../../../context/task/useTask.Context'
import { Button } from '../../../component/Button'

type props = {
  id: string
}

function ButtonModifiedTask(prop: props) {
  const navigate = useNavigate()
  const { setSelectTasks } = useTask()
  const handlerClick = (index: string) => {
    setSelectTasks(index)
    navigate('/project/modifiedTask')
  }
  return (
    <Button
      type="submit"
      value="Modified Task"
      classname="w-100"
      variant="outline-success"
      handler={() => handlerClick(prop.id)}
    />
  )
}
export default ButtonModifiedTask
