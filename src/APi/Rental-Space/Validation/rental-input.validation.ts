import createError from "http-errors";
import type { RentalInputType } from "../rental-space-type.js";

export const RentalInput = ({location, size, price, availability}: RentalInputType) => {
  if (!location) throw createError(400, "location are required !!!");
  if (!size) throw createError(400, "space size are required !!!");
  if (!price) throw createError(400, "price are required !!!");
  if (!availability) throw createError(400, "availability are required !!!");
};
