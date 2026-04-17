import { ApiError } from "../../../Utils/apiError.js";

export const RegisterInputValidation = (
  name: string,
  email: string,
  password: string,
) => {
  if (!name) throw new ApiError(400, "name are requied");
  if (!email) throw new ApiError(400, "email are requied");
  if (!password) throw new ApiError(400, "password are requied");
};
