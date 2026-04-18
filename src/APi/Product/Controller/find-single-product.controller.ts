import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from 'http-errors'

export const FindSingleProducts = asyncHandler(async(req, res) => {
  const id = req.params.id as string
  if(!id) throw createError(400, 'Param id required !!!')

  // find product
  const product = await prisma.product.findFirst({where: {id}})
  
  // add link
  const links = {
    self: `/products/${id}`,
    vendorLink: `/vendors/${product?.vendorId}`
  }

  // res 
  res.status(200).json(new apiResponse(200, {product, links}))
})