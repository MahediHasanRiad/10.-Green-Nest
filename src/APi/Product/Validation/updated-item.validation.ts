import type { ProductType, UpdateProductType } from "../product-type.js";

export const UpdatedItems = async ({
  name,
  description,
  price,
  category,
  availableQuantity,
  sustainabilityCardId,
}: UpdateProductType) => {

  const updated: Partial<ProductType> = {};

  if (name !== undefined) updated.name = name;
  if (description !== undefined) updated.description = description;
  if (price !== undefined) updated.price = price;
  if (category !== undefined) updated.category = category;
  if (availableQuantity !== undefined) updated.availableQuantity = availableQuantity;
  if (sustainabilityCardId !== undefined) updated.sustainabilityCardId = sustainabilityCardId;

  return updated;

};
