"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organizaciones_controller_1 = require("../controllers/organizaciones.controller");
const router = express_1.default.Router();
//Insertando nueva organizacion
//http://localhost:3000/organizaciones/nuevaOrganizacion
router.post('/nuevaOrganizacion', organizaciones_controller_1.insertarOrganizacion);
//Agregando cursos desde organizacion
//http://localhost:3000/organizaciones/nuevoCurso
router.post('/nuevoCurso', organizaciones_controller_1.nuevoCurso);
//Eliminar curso desde organizacion
//http://localhost:3000/organizaciones/eliminarCurso
router.post('/eliminarCurso', organizaciones_controller_1.eliminarCurso);
//Ver los instructores de cada organizacion
//http://localhost:3000/organizaciones/verInstructoresxOrganizacion
router.post('/instructores', organizaciones_controller_1.verInstructoresxOrganizacion);
//Ver los instructores de cada organizacion
//http://localhost:3000/organizaciones/cursos
router.post('/cursos', organizaciones_controller_1.cursosOrganizacion);
//Alumnos del curso de una organizacion especifica
//http://localhost:3000/organizaciones/alumnosOrganizacion
router.post('/alumnosOrganizacion', organizaciones_controller_1.alumnosOrganizacion);
exports.default = router;
