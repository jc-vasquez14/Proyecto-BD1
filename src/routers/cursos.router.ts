import express from "express";
import { nuevoCurso, obtenerTodosCursos } from "../controllers/cursos.controller";

const router = express.Router();

//Obtener toda la informacion
//http://localhost:3000/cursos/
router.get('/', obtenerTodosCursos);

//Insertando primer registro
//http://localhost:3000/cursos/nuevoCurso
router.post('/nuevoCurso', nuevoCurso);

export default router;