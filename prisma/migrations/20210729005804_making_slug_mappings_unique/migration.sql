/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `slugs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "slugs" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "slugs.slug_unique" ON "slugs"("slug");
