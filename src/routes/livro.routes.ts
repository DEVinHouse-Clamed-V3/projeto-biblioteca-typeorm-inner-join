import { Request, Response, Router } from 'express';
import { getRepository } from "typeorm";
import { Livro } from "../entities/Livro";

const livroRoutes = Router();



export default livroRoutes;



