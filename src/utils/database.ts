import * as oracledb from 'oracledb';

const connectionConfig: oracledb.ConnectionAttributes = {
    user: 'HR',
    password: 'hr',
    connectString: 'localhost/XE', // Reemplaza con tu información
};

export const obtenerConexionOracle = async () => {
      const connection = await oracledb.getConnection(connectionConfig);
      return connection;
  };