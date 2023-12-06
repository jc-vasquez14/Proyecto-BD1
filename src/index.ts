import express, { Request, Response, Express } from 'express';
import estudiantesRouter from "./routers/estudiantes.router";
import cursosRouter from "./routers/cursos.router";

const app:Express = express();
const PORT = 3000;

app.use(express.json());

app.use('/estudiantes', estudiantesRouter);
app.use('/cursos', cursosRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Configura la conexión a Oracle
//const dbConfig: oracledb.PoolAttributes = {
  //user: 'JOEL_CARCAMO',
  //password: '1234',
  //connectString: 'localhost/XE'
//};


// Configura la conexión a Oracle
//const dbConfig: oracledb.PoolAttributes = {
  //user: 'DB_COURSERA',
  //password: '1234',
  //connectString: 'localhost/XE'
//};

//const dbConfig: oracledb.PoolAttributes = {
  //user: 'HR',
  //password: 'hr',
  //connectString: 'localhost/XE'
//};

//app.get('/api/data', async (req, res) => {
  //var connection;
  //try {
    // Establece la conexión
    //connection = await oracledb.getConnection(dbConfig);

    // Realiza una consulta
    //const result = await connection.execute('SELECT FIRST_NAME as "Primer Nombre" FROM EMPLOYEES');

    //res.json(result.rows);
    //res.json({code: "exito"});
    
  //} catch (error) {
    //console.error('Error en la consulta a la base de datos:', error);
    //res.status(500).send('Error en el servidor');
  //} finally {
    //if (connection) {
      //try {
        // Libera la conexión
        //await connection.close();
      //} catch (error) {
        //console.error('Error al cerrar la conexión:', error);
      //}
    //}
  //}
//});