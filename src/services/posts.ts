import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createPost = async (data: Prisma.PostCreateInput) => {
    try {
        if (!data.author?.connect?.id) {
            throw new Error("O ID do autor é obrigatório");
        }

        const user = await prisma.user.findUnique({
            where: { id: data.author.connect.id },
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const post = await prisma.post.create({ data });
        return post;
    } catch (err) {
        throw err;
    }
}

export const getAllPosts = async () => {
    const posts = await prisma.post.findMany();
    return posts;
}

export const getPostById = async (id: number) => {
    const posts = await prisma.post.findUnique({
        where: { id }
    });
    return posts;
}

export const updatePost = async (id: number, data: Prisma.PostUpdateInput) => {
    try {
        const updateData = { ...data };

        const updatePost = await prisma.post.update({
            where: { id },
            data: updateData,
        })
        return updatePost;
    } catch (err) {
        throw err;
    }
}

export const deletePost = async (id: number) => {
    await prisma.post.delete({
        where: { id }
    })

    return deletePost;
}