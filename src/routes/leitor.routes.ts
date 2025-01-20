import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import Reader from "../entities/Leitor";

const readerRoutes = Router();

readerRoutes.post("/", async (req, res) => {
  const { name, email, phone_number, birthdate, address, active } = req.body;

  const repository = AppDataSource.getRepository(Reader);
  const reader = repository.create({
    name,
    email,
    phone_number,
    birthdate,
    address,
    active,
  });

  await repository.save(reader);
  return res.status(201).json(reader);
});

readerRoutes.get("/", async (req, res) => {
  const repository = AppDataSource.getRepository(Reader);
  const readers = await repository.find();
  return res.status(200).json(readers);
});

readerRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const repository = AppDataSource.getRepository(Reader);

  const reader = await repository.findOne({ where: { id: Number(id) } });
  if (!reader) {
    return res.status(404).json({ error: "Leitor não encontrado" });
  }
  return res.status(200).json(reader);
});

readerRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, birthdate, address, active } = req.body;

  const repository = AppDataSource.getRepository(Reader);

  const reader = await repository.findOne({ where: { id: Number(id) } });
  if (!reader) {
    return res.status(404).json({ error: "Leitor não encontrado" });
  }

  repository.merge(reader, {
    name,
    email,
    phone_number,
    birthdate,
    address,
    active,
  });
  await repository.save(reader);
  return res.status(200).json(reader);
});

readerRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const repository = AppDataSource.getRepository(Reader);

  const result = await repository.delete(id);
  if (result.affected === 0) {
    return res.status(404).json({ error: "Leitor não encontrado" });
  }

  return res.status(204).send();
});

export default readerRoutes;