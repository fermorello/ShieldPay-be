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

INSERT INTO "chains" ("name", "symbol", "description") VALUES
  ('Ethereum', 'ETH', 'Ethereum Chain'),
  ('Bitcoin', 'BTC', 'Bitcoin Chain'),
  ('Polygon', 'MATIC', 'Polygon Chain');

INSERT INTO "users" ("email", "password") VALUES
  ('user1@example.com', '$2a$10$1gcEQDfZyT7PN9FAuL9Uuutx8o8BrL30EM0iaEhhMPS4jREJuRj.a'),
  ('user2@example.com', '$2a$10$1gcEQDfZyT7PN9FAuL9Uuutx8o8BrL30EM0iaEhhMPS4jREJuRj.a');

INSERT INTO "wallets" ("tag", "address", "user_id", "chain_id") VALUES
  ('Main Wallet', '0xC095f52b32C7AF08GC9C6e0321Ba4a34377ef640', 1, 1),
  ('Savings Wallet', '0xC095f52b45C7AF08b69C6e0321Ba4a34377ef640', 2, 2);