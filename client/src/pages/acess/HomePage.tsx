import { useNavigate } from 'react-router-dom'
import { Text } from '../../component/Text'
import { useAuth } from '../../context/auth/useAuth.Context'
// import { useEffect } from 'react'

function HomePage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/project')
  //   }
  // }, [isAuthenticated, navigate])
  if (isAuthenticated) {
    navigate('/project')
  }
  return (
    <div>
      <article>
        <Text />
      </article>
    </div>
  )
}
export default HomePage
