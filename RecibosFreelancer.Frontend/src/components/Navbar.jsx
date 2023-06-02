import { Container, Nav, Navbar as NavbarRB } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
    return (
    <NavbarRB bg="dark" variant="dark">
        <Container fluid>
          <NavbarRB.Brand as={Link} to="/" >Facturacion</NavbarRB.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/crear-recibo">Crear recibo</Nav.Link>
          </Nav>
        </Container>
      </NavbarRB>
    )
}


export default Navbar;