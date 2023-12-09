import express from "express";
import { instructorLogin } from "../controllers/instructores.controller";

const router = express.Router();

//Cuando un instructor vaya a logearse
//http://localhost:3000/instructores/login
router.post('/login', instructorLogin);

export default router;