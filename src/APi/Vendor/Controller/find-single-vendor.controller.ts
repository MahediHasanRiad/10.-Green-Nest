import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from 'http-errors'

export const FindSingleVendorController = asyncHandler(async(req, res) => {
  /**
   * get id = req.params.id
   * if(!id) return error
   * find vendor
   * if (!exist) return 
   * res
   */

  const id = req.params.id as string
  if(!id) throw createError(400, 'Param id required !!!')

  // find vendor
  const vendor = await prisma.vendor.findFirst({where: {id}})
  if(!vendor) throw createError(404, 'vendor not found !!!')
  
  // res
  res.status(200).json(new apiResponse(200, vendor))

})