import { Request, Response } from "express"
import { obtenerConexionOracle } from "../utils/database";

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

export const eliminarCurso = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_CURSO } = req.body;
    const sql = `delete from tbl_cursos where id_curso = :id`;
    const binds = [ID_CURSO];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json({ success: true, message: 'Curso eliminado correctamente'});
    res.end();
}

export const verInstructoresxOrganizacion = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_ORGANIZACION } = req.body;
    const sql = `select a.id_instructor, b.id_organizacion, b.nombre, c.nombre, c.apellido
                from tbl_instructores a
                inner join tbl_organizacion b
                on(a.id_organizacion = b.id_organizacion)
                inner join tbl_personas c
                on(a.id_instructor = c.id_persona)
                where b.id_organizacion = :id`;
    const binds = [ID_ORGANIZACION];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json((await result).rows);
    res.end();
}

export const cursosOrganizacion = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_ORGANIZACION } = req.body;
    const sql = `select a.id_curso, a.nombre, b.id_organizacion, b.nombre Nombre_Organizacion
                from tbl_cursos a
                inner join tbl_organizacion b
                on(a.id_organizacion = b.id_organizacion)
                where b.id_organizacion = :id`;
    const binds = [ID_ORGANIZACION];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json((await result).rows);
    res.end();
}

export const alumnosOrganizacion = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_ORGANIZACION } = req.body;
    const sql = `select a.id_alumno, c.nombre, d.id_organizacion, d.nombre NombreOrganizacion
                from tbl_alumnos a
                inner join tbl_personas f
                on(a.id_alumno = f.id_persona)
                inner join tbl_matriculas b
                on(a.id_alumno = b.id_alumno)
                inner join tbl_cursos c
                on(b.id_curso = c.id_curso)
                inner join tbl_organizacion d
                on(c.id_organizacion = d.id_organizacion)
                where d.id_organizacion = :id`;
    const binds = [ID_ORGANIZACION];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json((await result).rows);
    res.end();
}