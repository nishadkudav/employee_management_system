import mongoose from "mongoose";
import validator from 'validator';



const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        required: [true , "Please enter name"],
    },
    email: {
        type: String,
        unique: [true,"email already exist"],
        required: [true , "Please enter email"],
        validate: validator.default.isEmail,
    },
    password: {
        type: String,
        required: [true , "Please enter password"],

    }

  }
);



  const loginModel = mongoose.model("users", userSchema);

  export default loginModel;