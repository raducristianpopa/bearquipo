import { AxiosResponse, AxiosResponseHeaders } from "axios";
import { API } from ".";
import { IUser } from "../features/auth/userSlice";

interface SignInProps {
  email: string;
  password: string;
}

export function logIn(data: SignInProps): Promise<AxiosResponse<IUser, AxiosResponseHeaders>> {
  return API.post("/auth/signin", data);
}

export function removeAllSessions(): Promise<AxiosResponse> {
  return API.post("/auth/signoutall");
}
