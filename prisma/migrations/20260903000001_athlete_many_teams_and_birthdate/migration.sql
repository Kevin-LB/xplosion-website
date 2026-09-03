-- CreateTable (jointure many-to-many athlète <-> équipe)
CREATE TABLE "_TeamAthletes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeamAthletes_AB_pkey" PRIMARY KEY ("A","B")
);

-- Migre les relations existantes (une équipe par athlète) vers la table
-- de jointure avant de supprimer l'ancienne colonne athletes.teamId.
INSERT INTO "_TeamAthletes" ("A", "B")
SELECT "id", "teamId" FROM "athletes" WHERE "teamId" IS NOT NULL;

-- DropForeignKey
ALTER TABLE "athletes" DROP CONSTRAINT "athletes_teamId_fkey";

-- DropIndex
DROP INDEX "athletes_teamId_idx";

-- AlterTable
ALTER TABLE "athletes" DROP COLUMN "teamId",
ADD COLUMN     "birthDate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "_TeamAthletes_B_index" ON "_TeamAthletes"("B");

-- AddForeignKey
ALTER TABLE "_TeamAthletes" ADD CONSTRAINT "_TeamAthletes_A_fkey" FOREIGN KEY ("A") REFERENCES "athletes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamAthletes" ADD CONSTRAINT "_TeamAthletes_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
