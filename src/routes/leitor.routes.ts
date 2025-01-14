import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Livro } from "../entities/Livro";

const livroRoutes = Router();
const livroRepository = AppDataSource.getRepository(Livro); // Corrigido aqui
// Criar livro
livroRoutes.post("/", async (req, res) => {
  try {
    const { title, description, publication_date, isbn, page_count, language } = req.body;


    const livro = livroRepository.create({
      title,
      description,
      publication_date,
      isbn,
      page_count,
      language,
    });

    await livroRepository.save(livro); // Salvar o livro criado no banco
    return res.status(201).json(livro); // Retornar o livro salvo
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar livro", error });
  }
});
// Buscar todos os livros
livroRoutes.get("/", async (_req, res) => {
  try {
    const livro = await livroRepository.find();
    return res.json(livro); // Retornar os livro encontrados
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar livro", error });
  }
});

// Buscar livro específico
livroRoutes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const livro = await livroRepository.findOneBy({ id: Number(id) });
    if (!livro) {
      return response.status(404).json({ error: "livro não encontrado" });
    }
    return response.json(livro);
  } catch (error) {
    return response.status(500).json({ error: "Erro ao buscar livro" });
  }
});

// Atualizar livro

livroRoutes.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const livro = await livroRepository.findOneBy({ id: Number(id) });
    if (!livro) {
      return response.status(404).json({ error: "livro não encontrado" });
    }
    livroRepository.merge(livro, request.body);
    const results = await livroRepository.save(livro);
    return response.json(results);
  } catch (error) {
    return response.status(500).json({ error: "Erro ao atualizar livro" });
  }
});

// Deletar livro
livroRoutes.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const livro = await livroRepository.findOneBy({ id: Number(id) });
    if (!livro) {
      return response.status(404).json({ error: "livro não encontrado" });
    }
    await livroRepository.remove(livro);
    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ error: "Erro ao deletar livro" });
  }
});

export default livroRoutes;
