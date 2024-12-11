-- CreateTable
CREATE TABLE "_SavedCollections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SavedCollections_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SavedCollections_B_index" ON "_SavedCollections"("B");

-- AddForeignKey
ALTER TABLE "_SavedCollections" ADD CONSTRAINT "_SavedCollections_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedCollections" ADD CONSTRAINT "_SavedCollections_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
