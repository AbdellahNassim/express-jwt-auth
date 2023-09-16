import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
type Props = {};

function App({}: Props) {
  return (
    <>
      <Header></Header>
      <ToastContainer />
      <Container as="main" className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
