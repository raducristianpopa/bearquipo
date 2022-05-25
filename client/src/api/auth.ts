import { API } from ".";

interface SignInProps {
  email: string;
  password: string;
}

export function signIn(data: SignInProps) {
  return API.post("/auth/signin", data);
}
