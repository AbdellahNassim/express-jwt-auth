import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import { RootState } from "../store";
import { AuthState } from "../slices/auth.slice";

type Props = {};

function PrivateRoute({}: Props) {
  const { userInfo } = useSelector<RootState, AuthState>((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
