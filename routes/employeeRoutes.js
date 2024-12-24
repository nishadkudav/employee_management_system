import express from "express";
import { createemployee, deleteemployeebyid, getallemployee, getemployeebyid, loginactionpage, registeractionpage, updateemployeebyid } from "../controller/employeecontroller.js";


const userroute = express.Router();
const registerroute = express.Router();
const loginroute = express.Router();

userroute.get('/', getallemployee)

userroute.post('/', createemployee)

userroute.put('/:id', updateemployeebyid)

userroute.get('/:id', getemployeebyid )

userroute.delete('/:id', deleteemployeebyid )

registerroute.post('/',registeractionpage)

loginroute.post('/', loginactionpage)

export{userroute,registerroute,loginroute}