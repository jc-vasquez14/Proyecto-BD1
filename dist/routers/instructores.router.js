"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const instructores_controller_1 = require("../controllers/instructores.controller");
const router = express_1.default.Router();
//Cuando un instructor vaya a logearse
//http://localhost:3000/instructores/login
router.post('/login', instructores_controller_1.instructorLogin);
exports.default = router;
