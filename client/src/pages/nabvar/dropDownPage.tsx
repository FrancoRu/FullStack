import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth.Context'
import { useProject } from '../../context/project/useProject.Context'
import { useTask } from '../../context/task/useTask.Context'

const LogOutPage: React.FC = () => {
  const { logOut } = useAuth()
  const { logout: logoutP } = useProject()
  const { logout: logoutT } = useTask()
  const navigate = useNavigate()

  const handleLogOut = () => {
    logOut()
    logoutP()
    logoutT()
    navigate('/')
  }

  return <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
}

const DropdownPage: React.FC = () => {
  const { user } = useAuth()
  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        Welcome {user?.username}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <LogOutPage />
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownPage
