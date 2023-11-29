import express from "express";
import { obtenerTodo } from "../controllers/estudiantes.controller";

const router = express.Router();

//Obtener toda la informacion
//http://localhost:3000/estudiantes/
router.get('/', obtenerTodo);

export default router;