import { PrismaClient } from "@prisma/client";
import { UserService } from "../../modules/users/services/user.service";
import { UserPostgresRepository } from "../../modules/users/repositories/user.postgres.repository";

const prismaClient = new PrismaClient()

const userPostgresRepository = new UserPostgresRepository(prismaClient);
export const UserServiceImp = new UserService(userPostgresRepository);