"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estudiantes_controller_1 = require("../controllers/estudiantes.controller");
const router = express_1.default.Router();
//Obtener toda la informacion
//http://localhost:3000/estudiantes/
router.get('/', estudiantes_controller_1.obtenerTodo);
//Insertando primer registro
//http://localhost:3000/estudiantes/primerReg
router.post('/primerReg', estudiantes_controller_1.nuevoRegistro);
exports.default = router;
