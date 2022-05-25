import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import HTTPStatus from "http-status";
import useragent from "express-useragent";

//@ts-ignore: No types found for `xss-clean` on 13 May 2022
import xss from "xss-clean";

import config from "@config/config";
import log from "@config/logger";
import APIError from "@config/APIError";
import { errorHandler, errorConverter } from "@middlewares/sendAPIError";

import apiv1 from "@modules/v1";

const app = express();

// enable cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// `helmet` provides secured HTTP headers & disable `X-Powered-By` header
app.use(helmet());
app.disable("X-Powered-By");

// use morgan for request logging in development
app.use(morgan("dev"));

// parse to json the request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize received data
app.use(xss());

// parse cookies
app.use(cookieParser());

// useragent parse
app.use(useragent.express());

app.use("/api/v1", apiv1);

// return a 404 error for any unknown api request
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new APIError(HTTPStatus.NOT_FOUND, "Resource not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// // handle error
app.use(errorHandler);

app.listen(config.port, "0.0.0.0", () => {
  log.info(`Listening to port ${config.port}.`);
});
