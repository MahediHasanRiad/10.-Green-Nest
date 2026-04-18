import { prisma } from "../../../lib/prisma.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { RentalInputType } from "../rental-space-type.js";
import createError from 'http-errors'
import { UpdatePermission } from "../Repository/update-permission.js";
import { UpdatedRentalSpace } from "../Validation/updated.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const UpdateRentalSpaceController = asyncHandler(async(req, res) => {
  /**
   * get {location, size, price, availability} = req.body
   * get id = req.param
   * if(!id) return error
   * find rental space
   * if(!exist) return error
   * verify permission for update
   * update
   * res
   */

  const {location, size, price, availability} = req.body as Partial<RentalInputType>
  
  const id = req.params.rentalSpaceId as string
  if(!id) throw createError(400, 'Param id required !!!')

  const userId = req.user?.id as string
  if(!userId) throw createError(401, 'Unauthorrized !!!')

  // find rental space
  const space = await prisma.rentalSpace.findFirst({where: {id}})
  if(!space) throw createError(404, 'Rental Space not found !!!')

  // verify permission for update
  await UpdatePermission(userId, req)

  // update items
  const updated = await UpdatedRentalSpace({location, size, price, availability})

  // update
  const rendtalStace = await prisma.rentalSpace.update({where: {id}, data: updated as any})

  // res 
  res.status(200).json(new apiResponse(200, rendtalStace))
})