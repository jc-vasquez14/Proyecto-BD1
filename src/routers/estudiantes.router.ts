import express from "express";
import { nuevaPersona, nuevoAlumno, obtenerEstadisticasPersonas} from "../controllers/estudiantes.controller";

const router = express.Router();

//Insertando persona a la tabla personas
//http://localhost:3000/estudiantes/registrarPersona
//CONSULTA MALA, PENDIENTE DE CAMBIOS
router.post('/registrarPersona', nuevaPersona);

//Inserta alumno a la tabla alumnos cuando ya existe en la tabla personas
//http://localhost:3000/estudiantes/registrarAlumno
//CONSULTA MALA, PENDIENTE DE CAMBIOS
router.post('/registrarAlumno', nuevoAlumno);

//PARA SABER LOS DETALLES DE CADA PERSONA, ID, NOMBRE, APELLIDO, FECHA DE NACIMIENTO
//CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULADOS
//http://localhost:3000/estudiantes/detallesPersona
router.get('/detallesPersona', obtenerEstadisticasPersonas);

export default router;