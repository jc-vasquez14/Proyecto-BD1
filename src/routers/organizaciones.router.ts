import express from "express";
import { alumnosOrganizacion, cursosOrganizacion, eliminarCurso, insertarOrganizacion, nuevoCurso, verInstructoresxOrganizacion } from "../controllers/organizaciones.controller";

const router = express.Router();

//Insertando nueva organizacion
//http://localhost:3000/organizaciones/nuevaOrganizacion
router.post('/nuevaOrganizacion', insertarOrganizacion);

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

//Alumnos del curso de una organizacion especifica
//http://localhost:3000/organizaciones/alumnosOrganizacion
router.post('/alumnosOrganizacion', alumnosOrganizacion);

export default router;