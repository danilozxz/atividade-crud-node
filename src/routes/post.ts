import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../services/posts";
import { Prisma } from "@prisma/client";

const router = Router();

router.post("/post", async (req, res) => {
    const { title, subtitle, body, userId } = req.body;

    const postData: Prisma.PostCreateInput = {
        title,
        subtitle,
        body,
        author: {
            connect: { id: userId },
        },
    };

    try {
        const post = await createPost(postData);
        res.status(201).json(post);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === "O ID do autor é obrigatório") {
                return res.status(400).json({ error: error.message });
            }

            if (error.message === "Usuário não encontrado.") {
                return res.status(404).json({ error: error.message });
            }

            console.error(error.message);
            return res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }

        console.error("Erro desconhecido:", error);
        res.status(500).json({ error: "Ocorreu um erro inesperado." });
    }
});

router.get('', async (req, res) => {
    const result = await getAllPosts();
    res.json({ result });
})

router.get('/post/:id', async (req, res) => {
    const { id } = req.params;

    const userId = Number(id);
    const result = await getPostById(userId);

    res.json({ result });
})

router.put('/post/:id', async (req, res) => {
    const { id } = req.params;
    const data: Prisma.PostUpdateInput = req.body;

    try {
        const updatedPost = await updatePost(Number(id), data);

        if (!updatedPost) {
            return res.status(404).json({ error: "Post não encontrado" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocorreu um erro inesperado." });
    }
});

router.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postId = Number(id);

    try {
        const result = await deletePost(postId);
        res.status(200).json({message: "Post deletado com sucesso", result});
    } catch (err: any) {
        if (err.message === "Post não encontrado.") {
            res.status(404).json({ error: "Post não encontrado." });
        } else {
            res.status(500).json({ error: "Erro ao deletar post.", details: err.message });
        }
    }
})

export default router;