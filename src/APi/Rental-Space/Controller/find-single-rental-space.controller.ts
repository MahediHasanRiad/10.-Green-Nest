import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from 'http-errors'

export const FindSingleRentalSpaceController = asyncHandler(async(req, res) => {
  /**
   * get id = req.params.rentalSpaceId
   * if(!id) return error
   * find rendtal space
   * if(!exist) retur error
   * res
   */
  const id = req.params.rentalSpaceId as string
  if(!id) throw createError(400, 'Param id required !!!')

  // find rental space
  const rentalSpace = await prisma.rentalSpace.findFirst({where: {id}})
  if(!rentalSpace) throw createError(404, 'Rental Space not found !!!')

  // add links
  const links = {
    self: `/rental-spaces/${id}`,
    vendorLink: `/vendors/${rentalSpace.vendorId}`
  }

  res.status(200).json(new apiResponse(200, {rentalSpace, links}))
})