const regex = {
  ONLY_ALPHA_NUM_DASH_SPACES_DOT: new RegExp(/^[a-zA-z0-9\s-_.]*$/, "i"),
  ONLY_ALPHA_SPACES: new RegExp(/^[a-zA-Z\s-]*$/, "i"),
  MIN_ONE_UPPERCASE: new RegExp(/(?=(.*[A-Z]){1})/),
  MIN_ONE_LOWERCASE: new RegExp(/(?=(.*[a-z]){1})/),
  MIN_ONE_NUMERIC: new RegExp(/(?=(.*[0-9]){1})/),
  MIN_ONE_SPECIAL: new RegExp(/(?=(.*[`!@#$%^&*()_{};:|,.<>?~]){1})/),
};

export default regex;
