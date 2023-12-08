import { Request, Response } from "express"
import { obtenerConexionOracle } from "../utils/database";

export const obtenerTodo = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const usuarios = await conexion.execute(`select a.department_id, b.department_name,
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
    conexion.close();
}

export const nuevoRegistro = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_CLIENTE, NOMBRE, APELLIDO } = req.body;
    const sql = 'insert into clientes(ID_CLIENTE, NOMBRE, APELLIDO) values(:id, :nombre, :apellido)';
    const binds = [ID_CLIENTE, NOMBRE, APELLIDO];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json({ success: true, message: 'Cliente insertado correctamente'});
    res.end();
}

//--------------------------------------------------------------------------------------------------------------

//PARA SABER LOS DETALLES DE CADA PERSONA, CANTIDAD DE CURSOS COMPLETADOS, CURSOS MATRICULAS, LA CONSULTA FUNCIONA
export const obtenerEstadisticasPersonas = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();

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

    const result = await conexion.execute(query);

    res.json(result.rows);
    res.end();
};
