import jwt, { decode } from 'jsonwebtoken';

const ensureAuthenticated = (req,res,next) => {
    const auth = req.headers('authorization');

    if(!auth){
        return res.status(403).json({message : "unauthorize  , jwt token require"})
    }

    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch{

        return res.status(403).json({message : "unauthorize  , jwt token wrong or expire"})

    }
}

export{
    ensureAuthenticated
}