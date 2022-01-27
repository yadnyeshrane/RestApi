import Joi from "joi";
import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import bcrypt from 'bcrypt';
import JwtServices from "../../services/JwtServices";


const loginController={
    async login(req,res,next)
    {
 const loginSchema=Joi.object({
     email:Joi.string().email().required(),
     password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
 })
 const {error}=loginSchema.validate(req.body)
 if(error)
 {
     return next(error);
 }
 try{
const user=await User.findOne({email:req.body.email});
//check if user exist
if(!user)
{
    return next(CustomErrorHandler.wrongCredentails());
}
//check for password
const match=await bcrypt.compare(req.body.password,user.password)
if(!match)
{
    return next (CustomErrorHandler.wrongCredentails());
}
//passowrd match generate acces-token
const access_token=JwtServices.sign({_id:user._id,role:user.role});
res.json({access_token})
 }
 catch(err)
 {

 }
    }
}

export default loginController;