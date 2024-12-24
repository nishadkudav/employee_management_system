import fileupload from "../middlewares/multer.js";
import employeeModel from "../models/employeeModel.js";
import userModel from "../models/loginModel.js";
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url'; 

const registeractionpage = async function (req, res) {
  console.log(req.body);

  var { name, email, password } = req.body;


  const user = await userModel.findOne({ email })
  console.log(user);

  if (user) {

    res.status(403).json({ message: "you have already an account", success: false });

  } else {

    var dataToInsert = {
      name: name,
      email: email,
      password: password
    }
    var instance = new userModel(dataToInsert);
    var resultAfterInsert = await instance.save();

    res.status(200).json({ message: "registration successfully", success: true });


  }

}


const loginactionpage = async function (req, res) {
  console.log(req.body);
  var { email, password } = req.body;



  const user = await userModel.findOne({ email })

  if (!user) {
    res.status(403).json({ message: "no record fund", success: false })
  }


  if (user.password === password) {


    const jwtToken = jwt.sign({ email: user.email, name: user.name, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })

    res.status(200).json({ message: "record fund", jwtToken, email, name: user.name, success: true })


  } else {
    res.status(403).json({ message: "password is incorrect", success: false })
  }




}



const createemployee = async (req, res) => {

  var curtimestamp = Date.now();
  var upload = fileupload('./uploads', 'profileimage', curtimestamp)
  upload(req, res, async function (err) {

    console.log(req.body);
    console.log(req.file);
    var record = { ...req.body, profileimage: req.file.filename }
    console.log(record);

    try {
      const emp = new employeeModel(record);
      await emp.save();

        res.status(201).json({
          message: 'Employee created successfully',
          success: true,
        });
     

    } catch (error) {

    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error,
    });

    }

  })

};



const getallemployee = async (req, res) => {

  try {

    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;


    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: 'i'
        }
      }
    }

    const totalemployee = await employeeModel.countDocuments(searchCriteria)


    const emps = await employeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalpages = Math.ceil(totalemployee / limit);

    res.status(200).json({
      message: 'all employee ',
      success: true,
      data: {
        employees: emps,
        pagination: {

          totalemployee,
          currentpage: page,
          totalpages,
          pagesize: limit
        }
      }
    })

  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      success: false,
      error: error
    })
  }

}

// const getemployeebyid = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const emp = await employeeModel.findOne({ _id: id });

//     if(emp.profileimage){
//       const imagepath  = path.join(__dirname , "uploads" , emp.profileimage )
//       res.sendFile(imagepath)

//     }


//     if (!emp) {
//       return res.status(404).json({
//         message: 'Employee not found',
//         success: false,
//       });
//     }

//     res.status(200).json({
//       message: 'Employee details retrieved successfully',
//       success: true,
//       employee: emp,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: 'Internal server error',
//       success: false,
//       error: error.message,
//     });
//   }
// };

const getemployeebyid = async (req, res) => {
  try {
    const { id } = req.params;
    // let imagepath = '';

    const emp = await employeeModel.findOne({ _id: id });

    // if (emp && emp.profileimage) {
    //   const __dirname = path.dirname(fileURLToPath(import.meta.url)); 
    //    imagepath = path.join(__dirname , '..' , 'uploads', emp.profileimage);
    //   console.log("Image path:", imagepath);
    //   // return res.sendFile(imagepath); 
    //   // return imagepath;
    // }

    if (!emp) {
      return res.status(404).json({
        message: 'Employee not found',
        success: false,
      });
    }

    const imagepath = emp.profileimage ? `/uploads/${emp.profileimage}` : '';


    res.status(200).json({
      message: 'Employee details retrieved successfully',
      success: true,
      employee: emp,
      imagepath: imagepath,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
};


const deleteemployeebyid = async (req, res) => {
  try {
    const { id } = req.params;

    const emp = await employeeModel.findByIdAndDelete({ _id: id });

    if (!emp) {
      return res.status(404).json({
        message: 'Employee not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Employee deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
}

const updateemployeebyid = async (req, res) => {

  var curtimestamp = Date.now();
  var upload = fileupload('./uploads', 'profileimage', curtimestamp)

  upload(req, res, async function (err) {

  try {

    console.log(req.body);
    console.log(req.file);
    
    const { name, phone, email, salary, department } = req.body;
    const { id } = req.params;

    let updateData = {
      name, phone, email, salary, department, updateAt: new Date()
    }

    if (req.file) {
      updateData.profileimage = req.file.filename;
    }

    const updateemployee = await employeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )

    if (!updateemployee) {
      return res.status(404).json({ message: 'employee not found' })
    }

    res.status(200).json({
      message: 'employee updated',
      success: true,
      data: updateemployee
    });

  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      success: false,
      error: error
    })
  }

})

}

export {
  createemployee,
  getallemployee,
  getemployeebyid,
  deleteemployeebyid,
  updateemployeebyid,
  registeractionpage,
  loginactionpage
}