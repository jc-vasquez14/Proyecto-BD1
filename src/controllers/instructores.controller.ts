import { Request, Response } from "express"
import { obtenerConexionOracle } from "../utils/database";


//--------------------------------------------------------------------------------------------------------------
export const instructorLogin = async (req: Request, res: Response) => {

    const conexion = await obtenerConexionOracle();
    const { cuenta_instructor, contrasenia } = req.body;
    const sql = 'SELECT * FROM tbl_instructores WHERE cuenta_instructor = :cuenta AND contrasenia = :contrasenia';
    const binds = [cuenta_instructor, contrasenia];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json({ success: true, message: 'Inicio de sesión exitoso'});
    res.end();
}

//--------------------------------------------------------------------------------------------------------------
//PARA SABER LOS DETALLES DE CADA PERSONA, CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULAS, LA CONSULTA FUNCIONA
export const obtenerEstadisticasInstructor = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();

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

    const result = await conexion.execute(query);

    res.json(result.rows);
    res.end();
};


//--------------------------------------------------------------------------------------------------------------