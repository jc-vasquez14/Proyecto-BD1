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
//PARA SABER LOS CURSOS QUE OFRECEN CADA ORGANIZACION
//http://localhost:3000/cursos/organizacion
router.get('/organizacion', cursos_controller_1.obtenerCursosPorOrganizacion);
//PARA SABER LOS TIPOS DE CURSO DISPONIBLES
//http://localhost:3000/cursos/disponibles
router.get('/tipos', cursos_controller_1.obtenerTiposCursos);
//PARA SABER LA CANTIDAD DE ALUMNOS MATRICULADOS POR CURSO
//http://localhost:3000/cursos/estadisticas
router.get('/estadisticas', cursos_controller_1.obtenerEstadisticasCursos);
//PARA SABER MAS DETALLES ACERCA DE CADA CURSO
//http://localhost:3000/cursos/detalles
router.get('/detalles', cursos_controller_1.mostrarCursosConDetalles);
//PARA SABER QUE CURSOS SON GRATIS O PAGADOS
//http://localhost:3000/cursos/tiposDisponibles
router.get('/disponibles', cursos_controller_1.mostrarCursosDisponibles);
//PARA SABER LOS CURSOS QUE ESTAN DISPONIBLES
//http://localhost:3000/cursos/tiposDisponibles
router.get('/todosCursos', cursos_controller_1.mostrarCursos);
exports.default = router;
