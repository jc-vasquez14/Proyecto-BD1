import express from "express";
import { eliminarCurso, nuevoCurso } from "../controllers/organizaciones.controller";

const router = express.Router();

//Agregando cursos desde organizacion
//http://localhost:3000/organizaciones/nuevoCurso
router.post('/nuevoCurso', nuevoCurso);

//Eliminar curso desde organizacion
//http://localhost:3000/organizaciones/eliminarCurso
router.post('/eliminarCurso', eliminarCurso);

export default router;