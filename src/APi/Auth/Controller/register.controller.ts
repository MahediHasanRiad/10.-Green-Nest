import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { RegisterType } from "../auth.type.js";
import { ExistEmail } from "../Repository/check-email.repository.js";
import { createUser } from "../Repository/create-user.repository.js";
import { RegisterInputValidation } from "../Validation/register-input.validation.js";

export const registerController = asyncHandler( async (req, res) => {
  /**
   * get {name, email, password} = req.body
   * if (empty) return error
   * if(existEmail) return error
   * create
   */
  const {name, email, password} = req.body as RegisterType
  
  // validation input
  RegisterInputValidation(name, email, password)

  // check email exist or not
  await ExistEmail(email)

  // register user
  const user = await createUser(name, email, password)

  res.status(201).json(new apiResponse(201, user, 'successfully created !!!'))

})