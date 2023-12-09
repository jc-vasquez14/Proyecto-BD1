import express from "express";
import { alumnoLogin, nuevaPersona, nuevoAlumno, obtenerEstadisticasAlumno, ofertaCursos} from "../controllers/estudiantes.controller";

const router = express.Router();

 
//Cuando un alumno vaya a logearse
//http://localhost:3000/estudiantes/login
router.post('/login', alumnoLogin);

 
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

 
//PARA SABER LA OFERTA DE CURSOS CON TODOS SUS DETALLES
//http://localhost:3000/estudiantes/ofertaCursos
router.get('/ofertaCursos', ofertaCursos);

 

export default router;