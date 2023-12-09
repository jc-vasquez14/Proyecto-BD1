"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estudiantes_controller_1 = require("../controllers/estudiantes.controller");
const router = express_1.default.Router();
//Insertando primer registro
//http://localhost:3000/estudiantes/registrarAlumno
//CONSULTA MALA, PENDIENTE DE CAMBIOS
router.post('/registrarAlumno', estudiantes_controller_1.nuevoAlumno);
//PARA SABER LOS DETALLES DE CADA PERSONA, ID, NOMBRE, APELLIDO, FECHA DE NACIMIENTO
//CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULADOS
//http://localhost:3000/estudiantes/detallesPersona
router.get('/detallesPersona', estudiantes_controller_1.obtenerEstadisticasPersonas);
exports.default = router;
