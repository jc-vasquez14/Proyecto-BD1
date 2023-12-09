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
exports.obtenerEstadisticasInstructor = exports.obtenerEstadisticasAlumno = exports.nuevoAlumno = exports.nuevaPersona = exports.alumnoLogin = void 0;
const database_1 = require("../utils/database");
const alumnoLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const { cuenta_alumno, contrasenia } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE cuenta_alumno = :cuenta AND contrasenia = :contrasenia';
    const binds = [cuenta_alumno, contrasenia];
    const result = conexion.execute(sql, binds, { autoCommit: true });
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
    res.end();
});
exports.alumnoLogin = alumnoLogin;
const nuevaPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const { ID_PERSONA, NOMBRE, APELLIDO, FECHA_DE_NACIMIENTO } = req.body;
    const sql = 'insert into tbl_personas(id_persona, nombre, apellido, fecha_de_nacimiento) values(:id, :nombre, :apellido, :fecha)';
    const binds = [ID_PERSONA, NOMBRE, APELLIDO, FECHA_DE_NACIMIENTO];
    const result = conexion.execute(sql, binds, { autoCommit: true });
    res.json({ success: true, message: 'Persona registrada correctamente' });
    res.end();
});
exports.nuevaPersona = nuevaPersona;
const nuevoAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const { ID_ALUMNO, CUENTA_ALUMNO, CONTRASENIA } = req.body;
    const sql = 'insert into tbl_alumnos(id_alumno, cuenta_alumno, contrasenia) values(:id, :cuenta, :contrasenia)';
    const binds = [ID_ALUMNO, CUENTA_ALUMNO, CONTRASENIA];
    const result = conexion.execute(sql, binds, { autoCommit: true });
    res.json({ success: true, message: 'Alumno registrado correctamente' });
    res.end();
});
exports.nuevoAlumno = nuevoAlumno;
//--------------------------------------------------------------------------------------------------------------
//PARA SABER LOS DETALLES DE CADA PERSONA, CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULAS, LA CONSULTA FUNCIONA
const obtenerEstadisticasAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.obtenerEstadisticasAlumno = obtenerEstadisticasAlumno;
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
