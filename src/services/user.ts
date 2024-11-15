import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        const user = await prisma.user.create({ data });
        return user;
    } catch (err) {
        return false
    }
}

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            posts: true
        }
    });
    return users;
}

export const getUserById = async (id: number) => {

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });

    return user;
}

export const updateUser = async (id: number) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            role: 'ADMIN'
        }
    });

    return updatedUser;
}

export const deleteUser = async (id: number) => {
    await prisma.post.deleteMany({
        where: { userId: id },
    });

    const deletedUser = await prisma.user.delete({
        where: { id: id },
    });

    return deletedUser;
};
