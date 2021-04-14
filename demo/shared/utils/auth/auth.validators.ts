import { validator } from '@sinbix-common/validator';
import {
  EMAIL_VALIDATOR,
  FIRST_NAME_VALIDATOR,
  LAST_NAME_VALIDATOR,
  PASSWORD_VALIDATOR,
} from '@sinbix/demo/shared/utils/user';

export const SIGNIN_VALIDATOR = validator.object({
  data: validator
    .object({
      email: EMAIL_VALIDATOR.required(),
      password: PASSWORD_VALIDATOR.required(),
    })
    .required(),
});

export const SIGNUP_VALIDATOR = validator.object({
  data: validator
    .object({
      firstName: FIRST_NAME_VALIDATOR.required(),
      lastName: LAST_NAME_VALIDATOR.required(),
      email: EMAIL_VALIDATOR.required(),
      password: PASSWORD_VALIDATOR.required(),
    })
    .required(),
});
