import createError from 'http-errors'

export const RegisterInputValidation = (
  name: string,
  email: string,
  password: string,
) => {
  if (!name) throw createError(400, "name are requied");
  if (!email) throw createError(400, "email are requied");
  if (!password) throw createError(400, "password are requied");
};
