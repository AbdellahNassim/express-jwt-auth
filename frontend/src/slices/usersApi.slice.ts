import { apiSlice } from "./api.slice";

const USERS_URL = "/api/users";

interface UserData {
  _id: string | number;
  name: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  email: string;
  password: string;
  name: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserData, RegisterData>({
      query: (data) => ({
        url: USERS_URL + "/",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<UserData, LoginData>({
      query: (data) => ({
        url: USERS_URL + "/auth",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: USERS_URL + "/logout",
        method: "POST",
      }),
    }),
    updateUser: builder.mutation<UserData, Partial<UpdateUserData>>({
      query: (data) => ({
        url: USERS_URL + "/profile",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;
