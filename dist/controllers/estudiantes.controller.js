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
exports.nuevoRegistro = exports.obtenerTodo = void 0;
const database_1 = require("../utils/database");
const obtenerTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield (0, database_1.obtenerConexionOracle)();
    const usuarios = yield conexion.execute(`select a.department_id, b.department_name,
                                                count(1) cantidad_empleados,
                                                round(avg(salary),2) salario_promedio,
                                                min(salary) salario_minimo,
                                                max(salary) salario_maximo
                                                from employees a
                                                left join departments b
                                                on (a.department_id = b.department_id)
                                                group by a.department_id, b.department_name
                                                order by 3 DESC`);
    res.json(usuarios.rows);
    res.end();
});
exports.obtenerTodo = obtenerTodo;
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
