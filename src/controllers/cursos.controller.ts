import { Request, Response } from "express"
import { obtenerConexionOracle } from "../utils/database";

export const obtenerTodosCursos = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const cursos = await conexion.execute(`select * from tbl_cursos`);
    
    res.json(cursos.rows);
    res.end();
}

export const nuevoCurso = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_CURSO, ID_TEMA, ID_ORGANIZACION, ID_TIPO_CURSO, ID_DISPONIBILIDAD, ID_INSTRUCTOR, CUENTA_INSTRUCTOR, NOMBRE } = req.body;
    const sql = `insert into tbl_cursos(ID_CURSO, ID_TEMA, ID_ORGANIZACION, ID_TIPO_CURSO, 
                ID_DISPONIBILIDAD, ID_INSTRUCTOR, CUENTA_INSTRUCTOR, NOMBRE) 
                values(:id, :tema, :organizacion, :tipo_curso, :disponibilidad, :instructor, 
                :cuenta_instructor, :nombre)`;
    const binds = [ID_CURSO, ID_TEMA, ID_ORGANIZACION, ID_TIPO_CURSO, ID_DISPONIBILIDAD, ID_INSTRUCTOR, CUENTA_INSTRUCTOR, NOMBRE];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json({ success: true, message: 'Curso insertado correctamente'});
    res.end();
}