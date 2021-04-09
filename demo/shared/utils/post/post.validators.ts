import { validator } from '@sinbix-common/validator';

export const MAX_TITLE = 200;

export const TITLE_VALIDATOR = validator.string().max(MAX_TITLE);

export const CONTENT_VALIDATOR = validator.string();

export const WHERE_UNIQUE_POST_VALIDATOR = validator
  .object({
    id: validator.string(),
  })
  .min(1)
  .required();

export const CREATE_POST_VALIDATOR = validator
  .object({
    data: {
      title: TITLE_VALIDATOR.required(),
      content: CONTENT_VALIDATOR.required(),
    },
  })
  .unknown(true);

export const UPDATE_POST_VALIDATOR = validator
  .object({
    data: {
      title: TITLE_VALIDATOR,
      content: CONTENT_VALIDATOR,
    },
    where: WHERE_UNIQUE_POST_VALIDATOR,
  })
  .unknown(true);

export const DELETE_POST_VALIDATOR = validator
  .object({
    where: WHERE_UNIQUE_POST_VALIDATOR,
  })
  .unknown(true);
