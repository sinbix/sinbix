import { validator } from '@sinbix-common/validator';

export const MAX_FIRST_NAME = 200;

export const MAX_LAST_NAME = 200;

export const MAX_EMAIL = 200;

export const MIN_PASSWORD = 8;

export const MAX_PASSWORD = 25;

export const FIRST_NAME_VALIDATOR = validator.string().max(MAX_FIRST_NAME);

export const LAST_NAME_VALIDATOR = validator.string().max(MAX_LAST_NAME);

export const EMAIL_VALIDATOR = validator
  .string()
  .max(MAX_EMAIL)
  .email({ tlds: { allow: false } });

export const PASSWORD_VALIDATOR = validator
  .string()
  .min(MIN_PASSWORD)
  .max(MAX_PASSWORD);

export const WHERE_USER_UNIQUE_VALIDATOR = validator
  .object({
    email: EMAIL_VALIDATOR,
    id: validator.number().integer(),
  })
  .min(1)
  .required();

export const USER_VALIDATOR = validator.object({
  where: WHERE_USER_UNIQUE_VALIDATOR,
});

export const CREATE_USER_VALIDATOR = validator.object({
  data: validator
    .object({
      email: EMAIL_VALIDATOR.required(),
      password: PASSWORD_VALIDATOR.required(),
      profile: validator
        .object({
          firstName: FIRST_NAME_VALIDATOR.required(),
          lastName: LAST_NAME_VALIDATOR.required(),
        })
        .required(),
    })
    .required(),
});

export const UPDATE_USER_VALIDATOR = validator.object({
  data: validator
    .object({
      email: EMAIL_VALIDATOR,
      password: PASSWORD_VALIDATOR,
      profile: validator.object({
        firstName: FIRST_NAME_VALIDATOR,
        lastName: LAST_NAME_VALIDATOR,
      }),
    })
    .required(),
  where: WHERE_USER_UNIQUE_VALIDATOR,
});

export const DELETE_USER_VALIDATOR = validator.object({
  where: WHERE_USER_UNIQUE_VALIDATOR,
});
