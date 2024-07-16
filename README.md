
# NestJS Prisma Auth Demo

This is a demo project that demonstrates user registration and authentication flow using NestJS, Prisma, JWT, and REST.

## Features

- User Registration
- User Authentication
- JWT Token Generation
- Prisma ORM Integration
- Password Hashing and Validation

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 12.x)
- npm or yarn
- Docker (for running the database)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/imkxmx/nestjs-prisma-auth-demo.git
    cd nestjs-prisma-auth-demo
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Set up environment variables:

    Rename the `.env.example` file to `.env` and update the database connection string if necessary.

    ```bash
    mv .env.example .env
    ```

4. Run Docker to start the database:

    ```bash
    docker-compose up -d
    ```

5. Initialize Prisma:

    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

### Running the Application

Start the NestJS application:

```bash
yarn start:dev
```

The application will be available at `http://localhost:3000`.

### Project Structure

- `src/`
  - `main.ts`: Entry point of the application.
  - `app.module.ts`: Root module of the application.
  - `auth/`: Authentication module with controllers, services, and DTOs.
  - `profile/`: Profile module for user profile management.
  - `users/`: Users module for user management.
  - `@common/`: Common services and interfaces.
    - `services/`
      - `argon2.service.ts`: Password hashing service.
      - `redis.service.ts`: Redis service.
      - `prisma.service.ts`: Prisma service.
    - `interfaces/`
      - `cache-service.interface.ts`: Cache service interface.
      - `password-service.interface.ts`: Password service interface.
  - `prisma/`
    - `schema.prisma`: Prisma schema file.
    - `migrations/`: Prisma migrations.

### Using Prisma

To interact with your database, use the Prisma CLI:

- To apply migrations:

    ```bash
    npx prisma migrate dev
    ```

- To generate Prisma Client:

    ```bash
    npx prisma generate
    ```

- To open Prisma Studio:

    ```bash
    npx prisma studio
    ```

### Authentication

This project uses JWT for authentication. Upon successful login, a JWT token is returned. This token should be included in the `Authorization` header of subsequent requests.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
