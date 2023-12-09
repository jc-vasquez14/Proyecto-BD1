import express from "express";
import { nuevoRegistro, obtenerEstadisticasPersonas} from "../controllers/estudiantes.controller";

const router = express.Router();

//Insertando primer registro
//http://localhost:3000/estudiantes/primerReg
//CONSULTA MALA, PENDIENTE DE CAMBIOS
router.post('/nuevoAlumno', nuevoRegistro);

//PARA SABER LOS DETALLES DE CADA PERSONA, ID, NOMBRE, APELLIDO, FECHA DE NACIMIENTO
//CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULADOS
//http://localhost:3000/estudiantes/detallesPersona
router.get('/detallesPersona', obtenerEstadisticasPersonas);

export default router;