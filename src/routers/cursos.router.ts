import express from "express";
import { mostrarCursosConDetalles, mostrarCursosDisponibles, obtenerCursosPorOrganizacion,
     obtenerEstadisticasCursos, obtenerTiposCursos, obtenerTodosCursos, mostrarCursos, 
     insertarModulosPorCurso, transaccionCurso, matricularCurso, filtrarCurso } from "../controllers/cursos.controller";

const router = express.Router();

 
//Obtener toda la informacion
//http://localhost:3000/cursos/
router.get('/', obtenerTodosCursos);

 
//Insertando nuevos modulos
//http://localhost:3000/cursos/nuevoModulo
router.post('/nuevoModulo', insertarModulosPorCurso);

 
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
//http://localhost:3000/cursos/disponibles
router.get('/disponibles', mostrarCursosDisponibles);

 
//PARA SABER LOS CURSOS QUE ESTAN DISPONIBLES
//http://localhost:3000/cursos/todosCursos
router.get('/todosCursos', mostrarCursos);

 
//TRANSACCION DE UN CURSO
//http://localhost:3000/cursos/transaccion
router.post('/transaccion', transaccionCurso);

 
//MATRICULA DE UN CURSO
//http://localhost:3000/cursos/matricula
router.post('/matricula', matricularCurso);

 
//Filtrar cursos por tema
//http://localhost:3000/cursos/filtrar
router.post('/filtrar', filtrarCurso);

 

export default router;