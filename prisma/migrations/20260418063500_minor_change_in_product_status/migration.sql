/*
  Warnings:

  - Made the column `certificationStatus` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "certificationStatus" SET NOT NULL;
