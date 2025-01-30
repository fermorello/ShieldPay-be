/*
  Warnings:

  - You are about to drop the column `chain` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `chain_id` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "chain",
ADD COLUMN     "chain_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "chains" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "chains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chains_id_idx" ON "chains"("id");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_chain_id_fkey" FOREIGN KEY ("chain_id") REFERENCES "chains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
