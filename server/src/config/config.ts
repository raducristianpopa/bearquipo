import dotenv from "dotenv";
import path from "path";
import Joi, { ObjectSchema } from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

interface EnviromentVariablesProps {
  NODE_ENV: string;
  DOMAIN: string;
  PORT: number;
  POSTGRES_URL: string;
  JWT_TOKEN_SECRET: string;
  JWT_TOKEN_EXPIRATION_MINUTES: number;
  COOKIE_AUTH_NAME: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  DISCORD_REDIRECT_URI: string;
  DISCORD_OAUTH2_AUTHORIZATION: string;
  DISCORD_OAUTH2_ENDPOINT_TOKEN: string;
  DISCORD_OAUTH2_ENDPOINT_USERS: string;
}

//@joi-dev: `keys([schema])` - sets object keys
const enviromentVariablesSchema: ObjectSchema<EnviromentVariablesProps> = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development").required(),
    DOMAIN: Joi.string().required(),
    PORT: Joi.number().default(4000),
    POSTGRES_URL: Joi.string().required().description("PostgreSQL connection URL for Prisma."),
    JWT_TOKEN_SECRET: Joi.string().required().description("JWT access token secret key."),
    JWT_TOKEN_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("The amount of minutes after which the access token expires."),
    COOKIE_AUTH_NAME: Joi.string().required().description("Cookie name for the authentication service."),
    DISCORD_CLIENT_ID: Joi.string().required().description("Discord application client ID"),
    DISCORD_CLIENT_SECRET: Joi.string().required().description("Discord application client secret."),
    DISCORD_REDIRECT_URI: Joi.string().required().description("Local URI to redirect to Discord OAuth."),
    DISCORD_OAUTH2_AUTHORIZATION: Joi.string()
      .required()
      .description("Generated invite URL from Discord Developer portal."),
    DISCORD_OAUTH2_ENDPOINT_TOKEN: Joi.string()
      .required()
      .description("Discord API Endpoint to get user token."),
    DISCORD_OAUTH2_ENDPOINT_USERS: Joi.string()
      .required()
      .description("Discord API Endpoint to get informations about the user."),
  })
  //@joi-dev: Overrides the handling of unknown keys for the scope of the current object only (does not apply to children)
  .unknown();

const { value: enviromentVariables, error } = enviromentVariablesSchema
  .prefs({
    errors: { label: "key" },
  })
  .validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

export default {
  env: enviromentVariables.NODE_ENV,
  domain: enviromentVariables.DOMAIN,
  port: enviromentVariables.PORT,
  database: {
    url: enviromentVariables.POSTGRES_URL,
  },
  jwt: {
    tokenSecret: enviromentVariables.JWT_TOKEN_SECRET,
    tokenExpirationDays: enviromentVariables.JWT_TOKEN_EXPIRATION_MINUTES,
  },
  cookies: {
    authName: enviromentVariables.COOKIE_AUTH_NAME,
  },
  discord: {
    redirectURI: enviromentVariables.DISCORD_REDIRECT_URI,
    authorizationURI: enviromentVariables.DISCORD_OAUTH2_AUTHORIZATION,
    credentials: {
      clientId: enviromentVariables.DISCORD_CLIENT_ID,
      clientSecret: enviromentVariables.DISCORD_CLIENT_SECRET,
    },
    endpoints: {
      users: enviromentVariables.DISCORD_OAUTH2_ENDPOINT_USERS,
      token: enviromentVariables.DISCORD_OAUTH2_ENDPOINT_TOKEN,
    },
  },
};
