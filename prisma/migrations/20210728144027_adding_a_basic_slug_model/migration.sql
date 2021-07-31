-- CreateTable
CREATE TABLE "Slug" (
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
ALTER TABLE "Slug" ADD FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
