import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../services/user';

const router = Router();

router.post('/user', async (req, res) => {
    const { name, email } = req.body;
    const user = await createUser(
        {
            name: name,
            email: email,
        }
    )
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(500).json({ error: "E-mail já cadastrado!" });
    }
});

router.get('/users', async (req, res) => {
    const result = await getAllUsers();
    res.json({ result });

});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    const userId = Number(id);
    const result = await getUserById(userId);
    res.json({ result });

});

router.put('/user/:id', async (req, res) => {
    const { id } = req.params;

    const userId = Number(id);
    const result = await updateUser(userId);
    res.json({ result });
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    const userId = Number(id);

    try {
        const result = await deleteUser(userId);
        res.status(200).json({ message: "Usuário deletado com sucesso.", result });
    } catch (error: any) {
        if (error.message === "Usuário não encontrado.") {
            res.status(404).json({ error: "Usuário não encontrado." });
        } else {
            res.status(500).json({ error: "Erro ao deletar usuário.", details: error.message });
        }
    }
});

export default router;