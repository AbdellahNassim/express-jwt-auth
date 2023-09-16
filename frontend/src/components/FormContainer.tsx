import React from "react";
import { Container, Row, Col } from "react-bootstrap";
type Props = {
  children: React.ReactNode;
};

function FormContainer({ children }: Props) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="card p-5" xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
