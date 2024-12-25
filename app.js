import express from "express";
import 'dotenv/config'
import connectDB from "./db.js";
import cors from 'cors';
import { loginroute, registerroute, userroute } from "./routes/employeeRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url'; 


const app = express()
app.use(express.json());

// app.use(express.static("uploads"));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use(express.urlencoded());

// cors

const corsOptions = {
  origin: 'https://employee-management-system-nik.netlify.app', 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true, 
};

app.use(cors(corsOptions)); 

// dotenv

console.log(process.env.PORT);


// Connect to database
connectDB().then(() => console.log('Connected!')).catch((err)=>console.log(err));

//routes

app.use('/employee',userroute);
app.use('/signup',registerroute);
app.use('/signin',loginroute);



app.listen(process.env.PORT , ()=>{
    console.log('server start',process.env.PORT);
    
  })