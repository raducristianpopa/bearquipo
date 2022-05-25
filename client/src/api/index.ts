import axios from "axios";

export type Maybe<T> = T | null;

export const API = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export interface APIError {
  statusCode: number;
  message: string;
  isOperational?: boolean;
  stack?: string;
  fields: Maybe<Array<FieldError>>;
}

export interface FieldError {
  field: any;
  message: string;
}
