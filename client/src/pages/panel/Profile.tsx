import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js/auto'
import Card from 'react-bootstrap/Card'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from 'react'
import { Button } from '../../component/Button'
import { useAuth } from '../../context/auth/useAuth.Context'

function Profile() {
  ChartJS.register(ArcElement, Tooltip, Legend)
  const { user } = useAuth()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button
        type="submit"
        variant="outline-success"
        handler={handleShow}
        value="Profile"
      />
      <Offcanvas show={show} placement="end" onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card>
            <Card.Body>
              <Card.Title>user: {user?.username}</Card.Title>
              <Card.Text>
                <p>id: {user?.id}</p>
                <p>email: {user?.email}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Profile
