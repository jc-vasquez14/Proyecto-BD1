import { Request, Response } from "express"
import { obtenerConexionOracle } from "../utils/database";


//--------------------------------------------------------------------------------------------------------------
//MOSTRAR TODOS LOS CURSOS
export const obtenerTodosCursos = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const cursos = await conexion.execute(`select * from tbl_cursos`);
    
    res.json(cursos.rows);
    res.end();
}


//--------------------------------------------------------------------------------------------------------------
//PARA SABER LOS CURSOS QUE ESTAN DISPONIBLES, LA CONSULTA FUNCIONA
export const mostrarCursos = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();

    const query = `SELECT
                    c.nombre AS nombre_curso
                FROM
                    tbl_cursos c`;

    const result = await conexion.execute(query);

    res.json(result.rows);
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
//PARA SABER QUE CURSOS SON GRATIS O PAGADOS, LA CONSULTA FUNCIONA
export const mostrarCursosDisponibles = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();

    const query = `SELECT 
                        a.nombre,
                    CASE 
                        WHEN a.id_disponibilidad = 1 THEN 'Gratis'
                        WHEN a.id_disponibilidad = 2 THEN 'Pagado'
                    ELSE 'Otro'
                    END AS tipo_curso
                    FROM 
                        tbl_cursos a
                    WHERE 
                        a.id_disponibilidad = 1 OR a.id_disponibilidad = 2`;

    const result = await conexion.execute(query);

    res.json(result.rows);
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
//PARA SABER MAS DETALLES ACERCA DE CADA CURSO, LA CONSULTA FUNCIONA
export const mostrarCursosConDetalles = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();

    const query = `SELECT
                    c.nombre AS nombre_curso,
                    p.nombre AS nombre_instructor,
                    t.nombre AS tema,
                    d.tipo_disponibilidad AS disponibilidad,
                    tc.tipo_curso AS tipo_curso,
                    COUNT(m.id_modulo) AS cantidad_modulos
                FROM
                    tbl_cursos c
                    JOIN tbl_instructores i ON c.id_instructor = i.id_instructor
                    JOIN tbl_personas p ON i.id_instructor = p.id_persona
                    JOIN tbl_temas t ON c.id_tema = t.id_tema
                    JOIN tbl_disponibilidad d ON c.id_disponibilidad = d.id_disponibilidad
                    JOIN tbl_tipos_cursos tc ON c.id_tipo_curso = tc.id_tipo_curso
                    LEFT JOIN tbl_modulos m ON c.id_curso = m.id_curso
                GROUP BY
                    c.nombre,
                    p.nombre,
                    t.nombre,
                    d.tipo_disponibilidad,
                    tc.tipo_curso`;

    const result = await conexion.execute(query);

    res.json(result.rows);
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
//PARA SABER LA CANTIDAD DE ALUMNOS MATRICULADOS POR CURSO, LA CONSULTA FUNCIONA
export const obtenerEstadisticasCursos = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();

    const query = `SELECT
                    c.nombre AS nombre_curso,
                    t.nombre AS tema,
                    p.nombre AS nombre_instructor,
                    COUNT(DISTINCT a.id_alumno) AS cantidad_alumnos_matriculados
                FROM
                    tbl_cursos c
                    JOIN tbl_instructores i ON c.id_instructor = i.id_instructor
                    JOIN tbl_personas p ON i.id_instructor = p.id_persona
                    JOIN tbl_matriculas m ON c.id_curso = m.id_curso
                    JOIN tbl_alumnos a ON m.id_alumno = a.id_alumno AND m.cuenta_alumno = a.cuenta_alumno
                    JOIN tbl_temas t ON c.id_tema = t.id_tema
                GROUP BY
                    c.nombre,
                    p.nombre,
                    t.nombre`;

    const result = await conexion.execute(query);

    res.json(result.rows);
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
//PARA SABER LOS TIPOS DE CURSO DISPONIBLES, LA CONSULTA FUNCIONA
export const obtenerTiposCursos = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();

    const query = `SELECT
                    c.nombre AS nombre_curso,
                CASE tc.id_tipo_curso
                    WHEN 1 THEN 'Certificado'
                    WHEN 2 THEN 'Titulo de Grado'
                    WHEN 3 THEN 'Proyecto'
                    ELSE 'Otro Tipo'
                END AS tipo_curso
                FROM
                    tbl_cursos c
                    JOIN tbl_instructores i ON c.id_instructor = i.id_instructor
                    JOIN tbl_tipos_cursos tc ON c.id_tipo_curso = tc.id_tipo_curso
                    JOIN tbl_temas t ON c.id_tema = t.id_tema
                ORDER BY
                    tipo_curso`;

    const result = await conexion.execute(query);

    res.json(result.rows);
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
//PARA SABER LOS CURSOS QUE OFRECEN CADA ORGANIZACION, LA CONSULTA FUNCIONA
export const obtenerCursosPorOrganizacion = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();

    const query = `SELECT
                    o.nombre AS nombre_organizacion,
                    c.nombre AS nombre_curso
                FROM
                    tbl_organizacion o
                    JOIN tbl_cursos c ON o.id_organizacion = c.id_organizacion`;

    const result = await conexion.execute(query);

    res.json(result.rows);
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
//PARA INSERTAR MODULOS
export const insertarModulosPorCurso = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_MODULO, ID_CURSO, NOMBRE_MODULO } = req.body;
    const sql = `
        INSERT INTO tbl_modulos (ID_MODULO, ID_CURSO, NOMBRE_MODULO) 
        VALUES (:id_modulo, :id_curso, :nombre_modulo)`;
    const binds = [ID_MODULO, ID_CURSO, NOMBRE_MODULO];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json({ success: true, message: 'Módulo insertado correctamente' });
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
//PARA HACER LA TRANSACCION DE UN CURSO
export const transaccionCurso = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_TRANSACCION, ID_CURSO, ID_MET_PAGO, ID_ALUMNO, CUENTA_ALUMNO, FECHA_TRANSACCION } = req.body;

    // Insertar en tbl_transacciones
    const sqlTransaccion = `
        INSERT INTO tbl_transacciones (ID_TRANSACCION, ID_CURSO, ID_MET_PAGO, ID_ALUMNO, CUENTA_ALUMNO, FECHA_TRANSACCION) 
        VALUES (:id_transaccion, :id_curso, :id_met_pago, :id_alumno, :cuenta_alumno, :fecha_transaccion)`;
    const bindsTransaccion = [ID_TRANSACCION, ID_CURSO, ID_MET_PAGO, ID_ALUMNO, CUENTA_ALUMNO, FECHA_TRANSACCION];
    const resultTransaccion = conexion.execute(sqlTransaccion, bindsTransaccion, { autoCommit: true });

    res.json({ success: true, message: 'Transacción realizada correctamente' });
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
// PARA MATRICULAR EL CURSO
export const matricularCurso = async (req: Request, res: Response) => {
    const conexion = await obtenerConexionOracle();
    const { ID_MATRICULA, ID_TRANSACCION, ID_CURSO, ID_ALUMNO, CUENTA_ALUMNO } = req.body;

    // Insertar en tbl_matriculas
    const sqlMatricula = `
        INSERT INTO tbl_matriculas (ID_MATRICULA, ID_TRANSACCION, ID_CURSO, ID_ALUMNO, CUENTA_ALUMNO) 
        VALUES (:id_matricula, :id_transaccion, :id_curso, :id_alumno, :cuenta_alumno)`;
    const bindsMatricula = [ID_MATRICULA, ID_TRANSACCION, ID_CURSO, ID_ALUMNO, CUENTA_ALUMNO];
    const resultMatricula = conexion.execute(sqlMatricula, bindsMatricula, { autoCommit: true });

    res.json({ success: true, message: 'Curso matriculado correctamente' });
    res.end();
};


//--------------------------------------------------------------------------------------------------------------
//FILTRAR CURSOS
export const filtrarCurso = async (req: Request, res: Response) => {
    
    const conexion = await obtenerConexionOracle();

    const { ID_TEMA } = req.body;
    const sql = `select a.id_curso, a.nombre, b.nombre Tema 
                    from tbl_cursos a
                    inner join tbl_temas b
                    on(a.id_tema = b.id_tema)
                    where a.id_tema = :id`;
    const binds = [ID_TEMA];
    const result = conexion.execute(sql, binds, { autoCommit: true });

    res.json((await result).rows);
    res.end();
};


//--------------------------------------------------------------------------------------------------------------