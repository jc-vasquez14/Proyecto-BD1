"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevoCurso = exports.obtenerTodosCursos = void 0;
const database_1 = require("../utils/database");
const obtenerTodosCursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const cursos = yield conexion.execute(`select * from tbl_cursos`);
    res.json(cursos.rows);
    res.end();
});
exports.obtenerTodosCursos = obtenerTodosCursos;
const nuevoCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const { ID_CURSO, ID_TEMA, ID_ORGANIZACION, ID_TIPO_CURSO, ID_DISPONIBILIDAD, ID_INSTRUCTOR, CUENTA_INSTRUCTOR, NOMBRE } = req.body;
    const sql = `insert into tbl_cursos(ID_CURSO, ID_TEMA, ID_ORGANIZACION, ID_TIPO_CURSO, 
                ID_DISPONIBILIDAD, ID_INSTRUCTOR, CUENTA_INSTRUCTOR, NOMBRE) 
                values(:id, :tema, :organizacion, :tipo_curso, :disponibilidad, :instructor, 
                :cuenta_instructor, :nombre)`;
    const binds = [ID_CURSO, ID_TEMA, ID_ORGANIZACION, ID_TIPO_CURSO, ID_DISPONIBILIDAD, ID_INSTRUCTOR, CUENTA_INSTRUCTOR, NOMBRE];
    const result = conexion.execute(sql, binds, { autoCommit: true });
    res.json({ success: true, message: 'Curso insertado correctamente' });
    res.end();
});
exports.nuevoCurso = nuevoCurso;
