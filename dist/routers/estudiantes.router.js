"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estudiantes_controller_1 = require("../controllers/estudiantes.controller");
const router = express_1.default.Router();
//Cuando un alumno vaya a logearse
//http://localhost:3000/estudiantes/login
router.post('/login', estudiantes_controller_1.alumnoLogin);
//Insertando persona a la tabla personas
//http://localhost:3000/estudiantes/registrarPersona
router.post('/registrarPersona', estudiantes_controller_1.nuevaPersona);
//Inserta alumno a la tabla alumnos cuando ya existe en la tabla personas
//http://localhost:3000/estudiantes/registrarAlumno
router.post('/registrarAlumno', estudiantes_controller_1.nuevoAlumno);
//PARA SABER LOS DETALLES DE CADA ALUMNO, ID, NOMBRE, APELLIDO, FECHA DE NACIMIENTO
//CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULADOS
//http://localhost:3000/estudiantes/obtenerEstadisticasAlumno
router.get('/obtenerEstadisticasAlumno', estudiantes_controller_1.obtenerEstadisticasAlumno);
//PARA SABER LA OFERTA DE CURSOS CON TODOS SUS DETALLES
//http://localhost:3000/estudiantes/cursosDisponibles
router.get('/ofertaCursos', estudiantes_controller_1.ofertaCursos);
exports.default = router;
