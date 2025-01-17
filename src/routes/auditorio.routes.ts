import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import Auditorium from "../entities/Auditorio";

const auditorioRoutes = Router();

// ======== criando um auditorio usando post t ========
auditorioRoutes.post("/", async (req, res) => {
  const { name, capacity, location, has_projector, has_sound_system } =
    req.body;

  const repository = AppDataSource.getRepository(Auditorium);

  const auditorium = repository.create({
    name,
    capacity,
    location,
    has_projector,
    has_sound_system,
  });

  await repository.save(auditorium);
  return res.status(201).json(auditorium);
});

// ======== aqui estou buscando todos os auditorios ========
auditorioRoutes.get("/", async (req, res) => {
  const repository = AppDataSource.getRepository(Auditorium);

  const auditoriums = await repository.find();
  return res.status(200).json(auditoriums);
});

// ======== aqui eu estosu buscando pelo id o auditorio ========
auditorioRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const repository = AppDataSource.getRepository(Auditorium);

  const auditorium = await repository.findOne({ where: { id: Number(id) } });
  if (!auditorium) {
    return res.status(404).json({ error: "Auditório não encontrado" });
  }
  return res.status(200).json(auditorium);
});

//  ======== aqui estou atualizando um auditorio ========
auditorioRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, capacity, location, has_projector, has_sound_system } =
    req.body;

  const repository = AppDataSource.getRepository(Auditorium);

  const auditorium = await repository.findOne({ where: { id: Number(id) } });
  if (!auditorium) {
    return res.status(404).json({ error: "Auditório não encontrado" });
  }

  repository.merge(auditorium, {
    name,
    capacity,
    location,
    has_projector,
    has_sound_system,
  });
  await repository.save(auditorium);
  return res.status(200).json(auditorium);
});

// ========  e por fim aqui estou deletando um auditoriro ========
auditorioRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const repository = AppDataSource.getRepository(Auditorium);

  const result = await repository.delete(id);
  if (result.affected === 0) {
    return res.status(404).json({ error: "Auditório não encontrado" });
  }

  return res.status(204).send();
});

export default auditorioRoutes;
