import { Request, Response } from "express"
import { obtenerConexionOracle } from "../utils/database";

export const instructorLogin = async (req: Request, res: Response) => {

    const conexion = await obtenerConexionOracle();
    const { cuenta_instructor, contrasenia } = req.body;
    const sql = 'SELECT * FROM tbl_instructores WHERE cuenta_instructor = :cuenta AND contrasenia = :contrasenia';
    const binds = [cuenta_instructor, contrasenia];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json({ success: true, message: 'Inicio de sesión exitoso'});
    res.end();
}