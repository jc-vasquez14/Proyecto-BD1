import express from "express";
import { cursosOrganizacion, eliminarCurso, nuevoCurso, verInstructoresxOrganizacion } from "../controllers/organizaciones.controller";

const router = express.Router();

//Agregando cursos desde organizacion
//http://localhost:3000/organizaciones/nuevoCurso
router.post('/nuevoCurso', nuevoCurso);

//Eliminar curso desde organizacion
//http://localhost:3000/organizaciones/eliminarCurso
router.post('/eliminarCurso', eliminarCurso);

//Ver los instructores de cada organizacion
//http://localhost:3000/organizaciones/verInstructoresxOrganizacion
router.post('/instructores', verInstructoresxOrganizacion);

//Ver los instructores de cada organizacion
//http://localhost:3000/organizaciones/cursos
router.post('/cursos', cursosOrganizacion);

export default router;