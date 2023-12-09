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
exports.obtenerEstadisticasInstructor = exports.instructorLogin = void 0;
const database_1 = require("../utils/database");
//--------------------------------------------------------------------------------------------------------------
const instructorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const { cuenta_instructor, contrasenia } = req.body;
    const sql = 'SELECT * FROM tbl_instructores WHERE cuenta_instructor = :cuenta AND contrasenia = :contrasenia';
    const binds = [cuenta_instructor, contrasenia];
    const result = conexion.execute(sql, binds, { autoCommit: true });
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
    res.end();
});
exports.instructorLogin = instructorLogin;
//--------------------------------------------------------------------------------------------------------------
//PARA SABER LOS DETALLES DE CADA PERSONA, CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULAS, LA CONSULTA FUNCIONA
const obtenerEstadisticasInstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const query = `SELECT
                    i.id_instructor,
                    i.cuenta_instructor,
                    p.nombre AS nombre_instructor,
                    p.apellido AS apellido_instructor,
                    COUNT(c.id_curso) AS cantidad_cursos_asignados
                FROM
                    tbl_instructores i
                    JOIN tbl_personas p ON i.id_instructor = p.id_persona
                    LEFT JOIN tbl_cursos c ON i.id_instructor = c.id_instructor AND i.cuenta_instructor = c.cuenta_instructor
                GROUP BY
                    i.id_instructor,
                    i.cuenta_instructor,
                    p.nombre,
                    p.apellido`;
    const result = yield conexion.execute(query);
    res.json(result.rows);
    res.end();
});
exports.obtenerEstadisticasInstructor = obtenerEstadisticasInstructor;
//--------------------------------------------------------------------------------------------------------------
