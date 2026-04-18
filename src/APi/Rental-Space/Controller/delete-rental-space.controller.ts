import { prisma } from "../../../lib/prisma.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from 'http-errors'
import { UpdatePermission } from "../Repository/update-permission.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const DeleteRentalSpacesController = asyncHandler(async(req, res) => {
  
  const id = req.params.rentalSpaceId as string
  if(!id) throw createError(400, 'Param Id required !!!')

  const userId = req.user?.id as string
  if(!userId) throw createError(401, 'Unauthorized !!!')

  // find rental space
  const space = await prisma.rentalSpace.findFirst({where: {id}})
  if(!space) throw createError(404, 'rental space not found !!!')

  // verify permission
  await UpdatePermission(userId, req)

  // delete
  await prisma.rentalSpace.delete({where: {id}})

  res.status(204).json(new apiResponse(204, null, 'successfully deleted !!!'))
})