import { Router } from 'express';
import { AppDataSource } from '../database/data-source';
import Autor from '../entities/Autor';

const autorRoutes = Router();
const autorRepository = AppDataSource.getRepository(Autor);

// Criar autor
autorRoutes.post('/', async (request, response) => {
    try {
        const autor = autorRepository.create(request.body);
        const results = await autorRepository.save(autor);
        return response.status(201).json(results);
    } catch (error) {
        return response.status(500).json({ error: "Erro ao criar autor" });
    }
});

// Buscar todos os autores
autorRoutes.get('/', async (request, response) => {
    try {
        const autores = await autorRepository.find();
        return response.json(autores);
    } catch (error) {
        return response.status(500).json({ error: "Erro ao buscar autores" });
    }
});

// Buscar autor específico
autorRoutes.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const autor = await autorRepository.findOneBy({ id: Number(id) });
        if (!autor) {
            return response.status(404).json({ error: "Autor não encontrado" });
        }
        return response.json(autor);
    } catch (error) {
        return response.status(500).json({ error: "Erro ao buscar autor" });
    }
});

// Atualizar autor
autorRoutes.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const autor = await autorRepository.findOneBy({ id: Number(id) });
        if (!autor) {
            return response.status(404).json({ error: "Autor não encontrado" });
        }
        autorRepository.merge(autor, request.body);
        const results = await autorRepository.save(autor);
        return response.json(results);
    } catch (error) {
        return response.status(500).json({ error: "Erro ao atualizar autor" });
    }
});

// Deletar autor
autorRoutes.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const autor = await autorRepository.findOneBy({ id: Number(id) });
        if (!autor) {
            return response.status(404).json({ error: "Autor não encontrado" });
        }
        await autorRepository.remove(autor);
        return response.status(204).send();
    } catch (error) {
        return response.status(500).json({ error: "Erro ao deletar autor" });
    }
});

export default autorRoutes;