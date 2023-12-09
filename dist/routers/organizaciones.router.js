"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organizaciones_controller_1 = require("../controllers/organizaciones.controller");
const router = express_1.default.Router();
//Agregando cursos desde organizacion
//http://localhost:3000/organizaciones/nuevoCurso
router.post('/nuevoCurso', organizaciones_controller_1.nuevoCurso);
//Eliminar curso desde organizacion
//http://localhost:3000/organizaciones/eliminarCurso
router.post('/eliminarCurso', organizaciones_controller_1.eliminarCurso);
exports.default = router;
