import { Button } from '../../../component/Button'
import { useTask } from '../../../context/task/useTask.Context'

type props = {
  id: string
}

function ButtonDeleteTask(prop: props) {
  const { removeSelectTask } = useTask()
  const handlerClick = (index: string) => {
    removeSelectTask(index)
  }
  return (
    <Button
      type="submit"
      value="Delete Task"
      classname="w-100"
      variant="outline-danger"
      handler={() => handlerClick(prop.id)}
    />
  )
}

export default ButtonDeleteTask
