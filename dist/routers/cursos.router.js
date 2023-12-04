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
exports.default = router;
