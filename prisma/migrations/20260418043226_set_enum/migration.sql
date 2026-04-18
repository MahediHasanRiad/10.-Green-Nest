/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `growthStage` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `certificationStatus` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Rent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'VENDOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PlantStatus" AS ENUM ('HEALTHY', 'NEED_CARE', 'DISEASED', 'DEAD');

-- CreateEnum
CREATE TYPE "GrowthStageStatus" AS ENUM ('SEED', 'SEEDING', 'GROWING', 'MATURE', 'HARVESTED');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('PENDING_APPROVAL', 'ISSUED', 'REVOKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Seeds', 'Tools', 'Organic');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "status",
ADD COLUMN     "status" "PlantStatus" NOT NULL DEFAULT 'HEALTHY',
DROP COLUMN "growthStage",
ADD COLUMN     "growthStage" "GrowthStageStatus" NOT NULL DEFAULT 'SEED';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'Seeds',
DROP COLUMN "certificationStatus",
ADD COLUMN     "certificationStatus" "CertificateStatus" NOT NULL DEFAULT 'PENDING_APPROVAL';

-- AlterTable
ALTER TABLE "Rent" DROP COLUMN "status",
ADD COLUMN     "status" "RentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
