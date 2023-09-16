import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { AppDispatch, RootState } from "../store";
import { AuthState } from "../slices/auth.slice";
import { logout } from "../slices/auth.slice";
import { useLogoutMutation } from "../slices/usersApi.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type Props = {};

const Header: React.FC<Props> = () => {
  const { userInfo } = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  //@ts-ignore
  const [logoutApi, { isLoading, error }] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err: any) {
      toast.error(err.data.message || err.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt className="me-2" />
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt className="me-2" />
                      Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
