CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL
);

CREATE TABLE "chains" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) UNIQUE NOT NULL,
  "symbol" VARCHAR(10) UNIQUE NOT NULL,
  "description" VARCHAR(255) NOT NULL
);

CREATE TABLE "wallets" (
  "id" SERIAL PRIMARY KEY,
  "tag" VARCHAR(255),
  "address" VARCHAR(255) NOT NULL,
  "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
  "chain_id" INTEGER REFERENCES "chains"("id") ON DELETE CASCADE
);

INSERT INTO "chains" ("name", "symbol", "description") VALUES
  ('Ethereum', 'ETH', 'Ethereum Chain'),
  ('Bitcoin', 'BTC', 'Bitcoin Chain'),
  ('Polygon', 'MATIC', 'Polygon Chain');

INSERT INTO "users" ("email", "password") VALUES
  ('user1@example.com', 'hashedpassword1'),
  ('user2@example.com', 'hashedpassword2');

INSERT INTO "wallets" ("tag", "address", "user_id", "chain_id") VALUES
  ('Main Wallet', '0xC095f52b32C7AF08GC9C6e0321Ba4a34377ef640', 1, 1),
  ('Savings Wallet', '0xC095f52b45C7AF08b69C6e0321Ba4a34377ef640', 2, 2);