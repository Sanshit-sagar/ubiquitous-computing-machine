/*
  Warnings:

  - You are about to drop the `Slug` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Slug" DROP CONSTRAINT "Slug_userEmail_fkey";

-- DropTable
DROP TABLE "Slug";

-- CreateTable
CREATE TABLE "slugs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "destination" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userEmail" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "slugs" ADD FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
