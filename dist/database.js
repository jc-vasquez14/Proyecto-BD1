"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const oracledb = __importStar(require("oracledb"));
const app = (0, express_1.default)();
const PORT = 3000;
// Configura la conexión a Oracle
//const dbConfig: oracledb.PoolAttributes = {
//user: 'JOEL_CARCAMO',
//password: '1234',
//connectString: 'localhost/XE'
//};
const dbConfig = {
    user: 'HR',
    password: 'hr',
    connectString: 'localhost/XE'
};
app.get('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var connection;
    try {
        // Establece la conexión
        connection = yield oracledb.getConnection(dbConfig);
        // Realiza una consulta
        const result = yield connection.execute('SELECT FIRST_NAME as "Primer Nombre" FROM EMPLOYEES');
        res.json(result.rows);
        //res.json({code: "exito"});
    }
    catch (error) {
        console.error('Error en la consulta a la base de datos:', error);
        res.status(500).send('Error en el servidor');
    }
    finally {
        if (connection) {
            try {
                // Libera la conexión
                yield connection.close();
            }
            catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }
}));
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
