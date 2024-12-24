import express from "express";
import { createemployee, deleteemployeebyid, getallemployee, getemployeebyid, loginactionpage, registeractionpage, updateemployeebyid } from "../controller/employeecontroller.js";
import { ensureAuthenticated } from "../middlewares/auth.js";


const userroute = express.Router();
const registerroute = express.Router();
const loginroute = express.Router();

userroute.get('/',ensureAuthenticated, getallemployee)

userroute.post('/',ensureAuthenticated,  createemployee)

userroute.put('/:id',ensureAuthenticated, updateemployeebyid)

userroute.get('/:id',ensureAuthenticated, getemployeebyid )

userroute.delete('/:id',ensureAuthenticated, deleteemployeebyid )

registerroute.post('/',registeractionpage)

loginroute.post('/', loginactionpage)

export{userroute,registerroute,loginroute}