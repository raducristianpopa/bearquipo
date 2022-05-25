import { AxiosResponse } from "axios";
import { IUser } from "../../features/auth/userSlice";
import { API } from "../index";

interface IUpdateUserProps {
  firstName: string;
  lastName: string;
}

export function updateUser(data: IUpdateUserProps): Promise<AxiosResponse<IUser, {}>> {
  return API.put("/user", data);
}
