/*
  Warnings:

  - Added the required column `sustainabilityCardId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sustainabilityCardId" TEXT NOT NULL,
ALTER COLUMN "certificationStatus" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sustainabilityCardId_fkey" FOREIGN KEY ("sustainabilityCardId") REFERENCES "SustainabilityCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
