import express from "express";
import { nuevoRegistro, obtenerTodo, obtenerEstadisticasPersonas} from "../controllers/estudiantes.controller";

const router = express.Router();

//Obtener toda la informacion
//http://localhost:3000/estudiantes/
router.get('/', obtenerTodo);

//Insertando primer registro
//http://localhost:3000/estudiantes/primerReg
router.post('/primerReg', nuevoRegistro);

//PARA SABER LOS DETALLES DE CADA PERSONA, CANTIDAD DE CURSOS COMPLETADOS,
//CURSOS MATRICULAS, LA CONSULTA FUNCIONA
//http://localhost:3000/estudiantes/
router.get('/detallesPersona', obtenerEstadisticasPersonas);

export default router;