import express from "express";
import { instructorLogin } from "../controllers/instructores.controller";
import { obtenerEstadisticasInstructor } from "../controllers/estudiantes.controller";

const router = express.Router();

//Cuando un instructor vaya a logearse
//http://localhost:3000/instructores/login
router.post('/login', instructorLogin);

//PARA SABER LOS DETALLES DE CADA INSTRUCTOR, ID, NOMBRE, APELLIDO, CURSOS ASIGNADOS
//http://localhost:3000/estudiantes/detallesInstructor
router.get('/detallesInstructor', obtenerEstadisticasInstructor);

export default router;