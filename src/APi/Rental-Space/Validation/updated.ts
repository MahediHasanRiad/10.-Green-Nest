import type { UpdateRentalInputType } from "../rental-space-type.js";

export const UpdatedRentalSpace = async ({location, size, price, availability}: UpdateRentalInputType) => {
  
  const updated: UpdateRentalInputType = {}

  if(location !== undefined) updated.location = location
  if(size !== undefined) updated.size = size
  if(price !== undefined) updated.price = price
  if(availability !== undefined) updated.availability = availability

  return updated
}