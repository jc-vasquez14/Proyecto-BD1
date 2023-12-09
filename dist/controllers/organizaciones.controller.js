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
exports.instructorLogin = void 0;
const instructorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = yield obtenerConexionOracle();
    const { cuenta_instructor, contrasenia } = req.body;
    const sql = 'SELECT * FROM tbl_instructores WHERE cuenta_instructor = :cuenta AND contrasenia = :contrasenia';
    const binds = [cuenta_instructor, contrasenia];
    const result = conexion.execute(sql, binds, { autoCommit: true });
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
    res.end();
});
exports.instructorLogin = instructorLogin;
