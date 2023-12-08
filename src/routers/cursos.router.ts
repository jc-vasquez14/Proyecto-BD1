import express from "express";
import { mostrarCursosConDetalles, mostrarCursosDisponibles, nuevoCurso, obtenerCursosPorOrganizacion,
     obtenerEstadisticasCursos, obtenerTiposCursos, obtenerTodosCursos, mostrarCursos} from "../controllers/cursos.controller";

const router = express.Router();

//Obtener toda la informacion
//http://localhost:3000/cursos/
router.get('/', obtenerTodosCursos);

//Insertando primer registro
//http://localhost:3000/cursos/nuevoCurso
router.post('/nuevoCurso', nuevoCurso);

//PARA SABER LOS CURSOS QUE OFRECEN CADA ORGANIZACION
//http://localhost:3000/cursos/organizacion
router.get('/organizacion', obtenerCursosPorOrganizacion);

//PARA SABER LOS TIPOS DE CURSO DISPONIBLES
//http://localhost:3000/cursos/tipos
router.get('/tipos', obtenerTiposCursos);

//PARA SABER LA CANTIDAD DE ALUMNOS MATRICULADOS POR CURSO
//http://localhost:3000/cursos/estadisticas
router.get('/estadisticas', obtenerEstadisticasCursos);

//PARA SABER MAS DETALLES ACERCA DE CADA CURSO
//http://localhost:3000/cursos/detalles
router.get('/detalles', mostrarCursosConDetalles);

//PARA SABER QUE CURSOS SON GRATIS O PAGADOS
//http://localhost:3000/cursos/tiposDisponibles
router.get('/disponibles', mostrarCursosDisponibles);

//PARA SABER LOS CURSOS QUE ESTAN DISPONIBLES
//http://localhost:3000/cursos/tiposDisponibles
router.get('/todosCursos', mostrarCursos);

export default router;