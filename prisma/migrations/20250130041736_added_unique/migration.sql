/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `chains` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol]` on the table `chains` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `wallets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chains_name_key" ON "chains"("name");

-- CreateIndex
CREATE UNIQUE INDEX "chains_symbol_key" ON "chains"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_address_key" ON "wallets"("address");
