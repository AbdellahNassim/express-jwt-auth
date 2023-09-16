import { Spinner } from "react-bootstrap";

type Props = {};

function Loader({}: Props) {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
}
export default Loader;
