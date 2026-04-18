import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { InputValueType } from "../vendor-type.js";
import createError from 'http-errors'

export const CreateVendorController = asyncHandler(async (req, res) => {
  /**
   * get id = req.user
   * if(!id) throw error
   * find exist vendor profile for this user
   * if (exist) return error
   * create
   * res
   */

  const {farmName, farmLocation} = req.body as InputValueType
  const id = req.user?.id

  if(!id) throw createError(401, "unauthorized !!!")
  if(!farmName || !farmLocation) throw createError(400, 'farmName & farmLocation both are required !!!')
  
  // check exist profile or not
  const exist = await prisma.vendor.findFirst({where: {userId: id}})
  if(exist) throw createError(400, 'already vendor profile created !!!')
  
  // create
  const vendor = await prisma.vendor.create({data: {
    userId: id,
    farmName: farmName,
    farmLocation: farmLocation
  }})

  // update user status
  await prisma.user.update({where: {id}, data: {role: 'VENDOR'}})

  res.status(201).json(new apiResponse(201, vendor))

})