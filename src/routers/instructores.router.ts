import express from "express";
import { instructorLogin, obtenerEstadisticasInstructor } from "../controllers/instructores.controller";

const router = express.Router();

 
//Cuando un instructor vaya a logearse
//http://localhost:3000/instructores/login
router.post('/login', instructorLogin);
 

//PARA SABER LOS DETALLES DE CADA INSTRUCTOR, ID, NOMBRE, APELLIDO, CURSOS ASIGNADOS
//http://localhost:3000/instructores/detallesInstructor
router.get('/detallesInstructor', obtenerEstadisticasInstructor);
 

export default router;