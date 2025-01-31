# Wallet Management Backend

## Summary
This project is an API for managing users and their wallets. It includes authentication features for sign-in and sign-out, as well as CRUD operations for managing wallets. The API uses JWT for session management and PostgreSQL as the database. It is built with TypeScript and Express.js.

## Project Structure

```
.env
.gitignore
docker-compose.yml
dockerfile
jest.config.js
package.json
prisma/
  schema.prisma
README.md
src/
  modules/
    auth/
      controller/
      dto/
      interfaces/
      router/
      services/
    wallets/
      controller/
      dto/
      entities/
      interfaces/
      repositories/
      router/
      services/
    users/
      controller/
      dto/
      entities/
      interfaces/
      repositories/
      router/
      services/
    chains
      controller/
      dto/
      entities/
      interfaces/
      repositories/
      router/
      services/
  config/
    config.ts
    database.ts
  shared/
    errors/
    instances/
    middleware/
    response/
  server.ts
  tests/
    auth/
    wallets/
tsconfig.json

```
 
## Installation

1. Clone the repository:
```
git clone https://github.com/fermorello/ShieldPay-be
cd ShieldPay-be
```

2. Install the dependencies:

```
npm install
```

3. Configure the environment variables in the .env file:
```
PORT=
DATABASE_URL=("postgresql://user:password@url:5432/db_name?schema=public")
JWT_SECRET=
JWT_EXPIRES_IN=
```

4. Generate the Prisma client:

```
npx prisma generate
```

5. Run the database migrations:

```
npx prisma migrate dev
```

## Usage

**Development**

To start the server in development mode:

```
npm run dev
```

**Production**

To build and run the server in production:
```
npm run build
npm start
```

### Docker

In case of using this alternative, the database url name in the .env file is: postgres

DATABASE_URL="postgresql://user:password@**postgres**:5432/db_name?schema=public"

**HINT**: user and password are on the docker-container.yml file.



```
docker-compose up --build
```

## Endpoints (/api) [Postman collection file available]

### Authentication

**POST /auth/signin**

Signs in a user and returns a JWT token for authentication.
Input:
```
{
    "email": "user1@example.com",
    "password": "hashedpassword1"
}
```
Output:
```
{
    "status": 200,
    "statusMsg": "Success",
    "data": {
        "accessToken": "",
        "user": {
            "id": 1,
            "email": "user1@example.com"
        }
    }
}
```

**POST /auth/logout [Requires JWT]**

Signs out a user (removes the JWT token).
Input: Authorization token (JWT).
Output: Success or error response.

### Users CRUD

**POST /users/register**

Create a new user

Input:
```
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### Chain CRUD

***POST /chains**
Create a new chain 

Input:
```
{
  "name": "Ethereum",
  "symbol": "ETH",
  "description": "Ethereum chain"
}
```

### Wallets CRUD

**GET /wallets**  [Requires JWT]

Retrieves all wallets for the authenticated user.
Input: Authorization token (JWT).
Output:
```
[
  {
    "id": 1,
    "user_id": 1,
    "tag": "Main Wallet",
    "chain_id": 1,
    "address": "0x1234567890abcdef"
  }
]
```

**POST /wallets**  [Requires JWT]

Creates a new wallet for the authenticated user.
Input:
```
{
  "tag": "Savings Wallet",
  "chain_id": 1,
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

Output: Success or error response.

**GET /wallets/:id** [Requires JWT]

Retrieves details of a specific wallet by ID.
Input: Wallet ID and Authorization token (JWT).
Output:
```
{
  "id": 1,
  "user_id": 1,
  "tag": "Main Wallet",
  "chain_id": 1,
  "address": "0x1234567890abcdef"
}
```

**PUT /wallets/:id**  [Requires JWT]

Updates a wallet for the authenticated user.
Input:
```
{
  "tag": "Updated Wallet",
  "chain_id": 1,
  "address": "0xabcdef1234567890"
}
```

Output: Success or error response.

**DELETE /wallets/:id**  [Requires JWT]

Deletes a wallet by ID.

Input: Wallet ID and Authorization token (JWT).

Output: Success or error response.


## Folder Structure
- **modules**:
  - **auth/**: Handles user authentication (sign-in, sign-out).
  - **users/**: Handles user business logic.
  - **wallets/**: Handles wallets business logic.
  - **chains/**: Handles chains business logic.
- **config/**: Configuration files.
- **shared/**: Shared code between modules (error handling, response formatting).

## Considerations

### Functional Considerations
- Passwords are securely hashed using a hashing library like bcrypt.
- JWT is used for session management and user authentication.
- Only authenticated users can access and manage their wallets.
- Error handling and validation are implemented for all inputs.
- JWT Tokens are invalidated when logout.


### Technical Considerations

- The API is built with Express.js and TypeScript.
- PostgreSQL is used as the database with Prisma as the ORM.
- Data is validated using zod.
- JWT tokens are used for authentication and authorization.
- Cache stores the invalidated tokens, once that an user logouts, he won't be able to use the old JWT.

### Improvement Considerations
- Rate Limiting for Authentication Endpoints
- Implementing Roles and Permissions
- Optimizing Database Queries with Indexes
- Adding Logging and Monitoring
  
## Postman Collection
The Postman collection for API testing can be found in Shieldpay.postman_collection.json.