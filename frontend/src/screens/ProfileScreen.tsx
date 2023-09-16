import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setCredentials } from "../slices/auth.slice";
import { Form, Button } from "react-bootstrap";
import { AppDispatch, RootState } from "../store";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApi.slice";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
type Props = {};

function ProfileScreen({}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { userInfo } = useSelector<RootState, AuthState>((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { data, error, isLoading }] = useUpdateUserMutation();
  useEffect(() => {
    setName(userInfo?.name ?? "");
    setEmail(userInfo?.email ?? "");
  }, [userInfo?.name, userInfo?.email]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      console.log("submit");
      try {
        const payload = await updateProfile({ name, email, password }).unwrap();

        dispatch(setCredentials(payload));
        toast.success("Profile Updated");
      } catch (err: any) {
        toast.error(err.data.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="my-2">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ProfileScreen;
