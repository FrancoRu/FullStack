import { useAuth } from '../../context/auth/useAuth.Context'
import Authenticated from './Authenticated'
import NotAuthenticated from './NotAuthenticated'
import Container from 'react-bootstrap/Container'
import NavbarBostrap from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import DropdownPage from './dropDownPage'
function Navbar() {
  const { isAuthenticated } = useAuth()
  return (
    <header>
      <NavbarBostrap collapseOnSelect expand="lg">
        <Container>
          <NavbarBostrap.Brand>
            {isAuthenticated ? <DropdownPage /> : 'List To Do'}
          </NavbarBostrap.Brand>
          <NavbarBostrap.Toggle aria-controls="responsive-navbar-nav" />
          <NavbarBostrap.Collapse id="responsive-navbar-nav">
            <Nav>
              {isAuthenticated ? <Authenticated /> : <NotAuthenticated />}
            </Nav>
          </NavbarBostrap.Collapse>
        </Container>
      </NavbarBostrap>
    </header>
  )
}
export default Navbar
