/*
  Warnings:

  - Added the required column `symbol` to the `chains` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chains" ADD COLUMN     "symbol" TEXT NOT NULL;
