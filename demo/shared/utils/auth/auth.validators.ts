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
      email: EMAIL_VALIDATOR,
      password: PASSWORD_VALIDATOR,
    })
    .required(),
});

export const SIGNUP_VALIDATOR = validator.object({
  data: validator
    .object({
      firstName: FIRST_NAME_VALIDATOR,
      lastName: LAST_NAME_VALIDATOR,
      email: EMAIL_VALIDATOR,
      password: PASSWORD_VALIDATOR,
    })
    .required(),
});
