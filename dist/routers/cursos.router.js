"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cursos_controller_1 = require("../controllers/cursos.controller");
const router = express_1.default.Router();
//Obtener toda la informacion
//http://localhost:3000/cursos/
router.get('/', cursos_controller_1.obtenerTodosCursos);
//Insertando primer registro
//http://localhost:3000/cursos/nuevoCurso
router.post('/nuevoCurso', cursos_controller_1.nuevoCurso);
//Insertando nueva organizacion
//http://localhost:3000/cursos/nuevaOrganizacion
router.post('/nuevaOrganizacion', cursos_controller_1.insertarOrganizacion);
//Insertando nuevos modulos
//http://localhost:3000/cursos/nuevoModulo
router.post('/nuevoModulo', cursos_controller_1.insertarModulosPorCurso);
//PARA SABER LOS CURSOS QUE OFRECEN CADA ORGANIZACION
//http://localhost:3000/cursos/organizacion
router.get('/organizacion', cursos_controller_1.obtenerCursosPorOrganizacion);
//PARA SABER LOS TIPOS DE CURSO DISPONIBLES
//http://localhost:3000/cursos/tipos
router.get('/tipos', cursos_controller_1.obtenerTiposCursos);
//PARA SABER LA CANTIDAD DE ALUMNOS MATRICULADOS POR CURSO
//http://localhost:3000/cursos/estadisticas
router.get('/estadisticas', cursos_controller_1.obtenerEstadisticasCursos);
//PARA SABER MAS DETALLES ACERCA DE CADA CURSO
//http://localhost:3000/cursos/detalles
router.get('/detalles', cursos_controller_1.mostrarCursosConDetalles);
//PARA SABER QUE CURSOS SON GRATIS O PAGADOS
//http://localhost:3000/cursos/disponibles
router.get('/disponibles', cursos_controller_1.mostrarCursosDisponibles);
//PARA SABER LOS CURSOS QUE ESTAN DISPONIBLES
//http://localhost:3000/cursos/todosCursos
router.get('/todosCursos', cursos_controller_1.mostrarCursos);
//TRANSACCION DE UN CURSO
//http://localhost:3000/cursos/transaccion
router.post('/transaccion', cursos_controller_1.transaccionCurso);
//MATRICULA DE UN CURSO
//http://localhost:3000/cursos/matricula
router.post('/matricula', cursos_controller_1.matricularCurso);
//Filtrar cursos por tema
//http://localhost:3000/cursos/filtrar
router.post('/filtrar', cursos_controller_1.filtrarCurso);
exports.default = router;
