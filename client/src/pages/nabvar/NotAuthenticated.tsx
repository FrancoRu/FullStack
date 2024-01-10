import { useNavigate } from 'react-router-dom'
import { Button } from '../../component/Button'

function NotAuthenticated() {
  const navigate = useNavigate()
  const handlerClick = (path: string) => {
    navigate(path)
  }
  return (
    <>
      <Button
        type="submit"
        classname="w-100"
        variant="outline-dark"
        handler={() => handlerClick('/')}
        value="Home"
      />
      <Button
        type="submit"
        classname="w-100"
        variant="outline-dark"
        handler={() => handlerClick('/login')}
        value="Log In"
      />
      <Button
        type="submit"
        classname="w-100"
        variant="outline-dark"
        handler={() => handlerClick('/register')}
        value="Sign Up"
      />
    </>
  )
}

export default NotAuthenticated
