/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_collectionId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "collectionId";

-- CreateTable
CREATE TABLE "_CollectionItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CollectionItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CollectionItems_B_index" ON "_CollectionItems"("B");

-- AddForeignKey
ALTER TABLE "_CollectionItems" ADD CONSTRAINT "_CollectionItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionItems" ADD CONSTRAINT "_CollectionItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
