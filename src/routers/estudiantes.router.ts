import express from "express";
import { nuevaPersona, nuevoAlumno, obtenerEstadisticasAlumno, obtenerEstadisticasInstructor} from "../controllers/estudiantes.controller";

const router = express.Router();

//Insertando persona a la tabla personas
//http://localhost:3000/estudiantes/registrarPersona
router.post('/registrarPersona', nuevaPersona);

//Inserta alumno a la tabla alumnos cuando ya existe en la tabla personas
//http://localhost:3000/estudiantes/registrarAlumno
router.post('/registrarAlumno', nuevoAlumno);

//PARA SABER LOS DETALLES DE CADA ALUMNO, ID, NOMBRE, APELLIDO, FECHA DE NACIMIENTO
//CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULADOS
//http://localhost:3000/estudiantes/obtenerEstadisticasAlumno
router.get('/obtenerEstadisticasAlumno', obtenerEstadisticasAlumno);

//PARA SABER LOS DETALLES DE CADA INSTRUCTOR, ID, NOMBRE, APELLIDO, CURSOS ASIGNADOS
//http://localhost:3000/estudiantes/detallesPersona
router.get('/detallesInstructor', obtenerEstadisticasInstructor);


export default router;