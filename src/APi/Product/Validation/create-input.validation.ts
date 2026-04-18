import createError from "http-errors";
import type { ProductType } from "../product-type.js";

export const CreateInputValidation = async ({
  name,
  description,
  price,
  category,
  availableQuantity,
  sustainabilityCardId,
}: ProductType) => {

  if (!name) createError(400, "name are required !!!");
  if (!description) createError(400, "description are required !!!");
  if (!price) createError(400, "price are required !!!");
  if (!category) createError(400, "category are required !!!");
  if (!availableQuantity)
    createError(400, "availableQuantity are required !!!");
  if (!sustainabilityCardId)
    createError(400, "sustainabilityCardId are required !!!");
  
};
