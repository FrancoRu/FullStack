import { useNavigate } from 'react-router-dom'
import { Button } from '../../component/Button'
import Panel from '../panel/Panel'
import Profile from '../panel/Profile'

function Authenticated() {
  const navigate = useNavigate()
  const handlerClick = (path: string) => {
    navigate(path)
  }
  return (
    <>
      <Panel />
      <Button
        type="submit"
        variant="outline-success"
        handler={() => handlerClick('/project')}
        value="project"
      />
      <Profile />
    </>
  )
}

export default Authenticated
