import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
type Props = {};

const Hero: React.FC<Props> = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="hero-card bg-light w-75 p-5 d-flex flex-column align-items-center">
          <h1 className="display-1">MERN App</h1>
          <p className="lead">A MERN stack authentication application</p>
          <div className="d-flex gap-2">
            <LinkContainer to="/login">
              <Button variant="primary">Login</Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Register</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
