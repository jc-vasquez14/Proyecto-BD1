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
}