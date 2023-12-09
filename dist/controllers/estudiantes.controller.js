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
exports.obtenerEstadisticasPersonas = exports.nuevoRegistro = void 0;
const database_1 = require("../utils/database");
const nuevoRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const { ID_CLIENTE, NOMBRE, APELLIDO } = req.body;
    const sql = 'insert into clientes(ID_CLIENTE, NOMBRE, APELLIDO) values(:id, :nombre, :apellido)';
    const binds = [ID_CLIENTE, NOMBRE, APELLIDO];
    const result = conexion.execute(sql, binds, { autoCommit: true });
    res.json({ success: true, message: 'Cliente insertado correctamente' });
    res.end();
});
exports.nuevoRegistro = nuevoRegistro;
//--------------------------------------------------------------------------------------------------------------
//PARA SABER LOS DETALLES DE CADA PERSONA, CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULAS, LA CONSULTA FUNCIONA
const obtenerEstadisticasPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const query = `SELECT
                    p.id_persona,
                    p.nombre AS nombre_persona,
                    p.apellido AS apellido_persona,
                    p.fecha_de_nacimiento,
                    COUNT(DISTINCT m.id_curso) AS cantidad_cursos_matriculados,
                    COUNT(DISTINCT c.id_curso_completado) AS cantidad_cursos_completados
                FROM
                    tbl_personas p
                    JOIN tbl_alumnos a ON p.id_persona = a.id_alumno
                    LEFT JOIN tbl_matriculas m ON a.id_alumno = m.id_alumno AND a.cuenta_alumno = m.cuenta_alumno
                    LEFT JOIN tbl_completados c ON a.id_alumno = c.id_alumno AND a.cuenta_alumno = c.cuenta_alumno
                GROUP BY
                    p.id_persona,
                    p.nombre,
                    p.apellido,
                    p.fecha_de_nacimiento`;
    const result = yield conexion.execute(query);
    res.json(result.rows);
    res.end();
});
exports.obtenerEstadisticasPersonas = obtenerEstadisticasPersonas;
