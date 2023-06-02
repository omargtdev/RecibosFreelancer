import { Col, Container, Row } from "react-bootstrap";

function ContainerCentered({ children }) {
    return (
        <Container fluid className="vh-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col className="text-center">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default ContainerCentered;