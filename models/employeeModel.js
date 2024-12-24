import mongoose from "mongoose";
import validator from 'validator';


const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    
    name: {
        type: String,
        required: [true , "Please enter name"],
    },
    profileimage: {
        type: String,
    },
    path: {
        type: String,
    },
    email: {
        type: String,
        unique: [true,"email already exist"],
        required: [true , "Please enter email"],
        validate: validator.default.isEmail,
    },
    phone: {
        type: String,
        required: [true , "Please add phonenumber"],

    },
    department: {
        type: String,
        required: [true , "Please enter department"],
    },
   
    salary: {
        type: String,
        required: [true , "Please enter salary"],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
  }
);



  const employeeModel = mongoose.model("employeeProfile", employeeSchema);

  export default employeeModel;