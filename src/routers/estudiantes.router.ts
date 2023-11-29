import express from "express";
import { nuevoRegistro, obtenerTodo } from "../controllers/estudiantes.controller";

const router = express.Router();

//Obtener toda la informacion
//http://localhost:3000/estudiantes/
router.get('/', obtenerTodo);

//Insertando primer registro
//http://localhost:3000/estudiantes/primerReg
router.post('/primerReg', nuevoRegistro);

export default router;