import { prisma } from "../../../lib/prisma.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from 'http-errors'

export const DeleteVendorController = asyncHandler(async(req, res) => {
  /**
   * get id = req.params.id
   * if(!id) return error
   * get userId = req.user.id
   * if(!userId) return error
   * verify permission for delete
   * delete
   * res
   */

  const id = req.params.id as string
  if(!id) throw createError(400, 'Param Id not found !!!')

  const userId = req.user?.id as string
  if(!userId) throw createError(401, 'Unauthorized !!!')

  // find vendor profile
  const findVendor = await prisma.vendor.findFirst({where: {id}})

  // verify vendor for update
  if (userId !== findVendor?.userId && req.user?.role !== "ADMIN")
    throw createError(403, "Does not have permission !!!");

  // delete
  await prisma.vendor.delete({where: {id}})
  
  // update user status
  await prisma.user.update({where: {id: userId}, data: {role: 'USER'}})



  res.status(204).json({message: 'successfull deleted'})

})