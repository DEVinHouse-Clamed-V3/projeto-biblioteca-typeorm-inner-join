import { Router } from "express";
import { getRepository } from "typeorm";
import { Autor } from "../entities/Autor";

const autorRouter = Router();

// Criar um novo autor
autorRouter.post("/", async (req, res) => {
  try {
    const { name, birthdate, biography, nationality, active } = req.body;
    const autorRepository = getRepository(Autor);

    const autor = autorRepository.create({
      name,
      birthdate,
      biography,
      nationality,
      active,
    });

    await autorRepository.save(autor);
    return res.status(201).json(autor);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar autor", error });
  }
});

// Buscar todos os autores
autorRouter.get("/", async (_req, res) => {
  try {
    const autorRepository = getRepository(Autor);
    const autores = await autorRepository.find();
    return res.json(autores);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar autores", error });
  }
});

// Buscar um autor por ID
autorRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const autorRepository = getRepository(Autor);

    const autor = await autorRepository.findOne(id);
    if (!autor) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    return res.json(autor);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar autor", error });
  }
});

// Atualizar um autor
autorRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthdate, biography, nationality, active } = req.body;
    const autorRepository = getRepository(Autor);

    const autor = await autorRepository.findOne(id);
    if (!autor) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    autorRepository.merge(autor, {
      name,
      birthdate,
      biography,
      nationality,
      active,
    });

    const updatedAutor = await autorRepository.save(autor);
    return res.json(updatedAutor);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar autor", error });
  }
});

// Deletar um autor
autorRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const autorRepository = getRepository(Autor);

    const result = await autorRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar autor", error });
  }
});

export default autorRouter;