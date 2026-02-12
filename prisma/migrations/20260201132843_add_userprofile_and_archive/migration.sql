/*
  Warnings:

  - Made the column `unitId` on table `Slide` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('EDITOR', 'ADMIN', 'SUPERADMIN');

-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_unitId_fkey";

-- AlterTable
ALTER TABLE "Slide" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "unitId" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'EDITOR',
    "unitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE INDEX "UserProfile_unitId_idx" ON "UserProfile"("unitId");

-- CreateIndex
CREATE INDEX "UserProfile_role_idx" ON "UserProfile"("role");

-- CreateIndex
CREATE INDEX "Slide_unitId_idx" ON "Slide"("unitId");

-- CreateIndex
CREATE INDEX "Slide_isActive_isArchived_order_idx" ON "Slide"("isActive", "isArchived", "order");

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
