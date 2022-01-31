import Joi from "joi";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import bcrypt from 'bcrypt';
import JwtServices from "../../services/JwtServices";
import { REFRESH_SECRET } from "../../Config";

const registerController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });
    //Validate the data
    const { error } = registerSchema.validate(req.body);
    
    if (error) {
      return next(error);
    }
  //Check with DB
  try{
const existValue=await User.exists({email:req.body.email})
if(existValue)
{
  // retur next()
  return next(CustomErrorHandler.alreadyExist('This email is already register'));
}
  } 
  catch(err) 
  {
return next(err);
  }
  //Hash Password
  const hashpassword=await bcrypt.hash(req.body.password,10);

  //modal bana
  const {name,email,password}=req.body;

  const user=User({
    name:name,
    email:email,
    password:hashpassword
  })

  let access_token;
  let refresh_token;
  try{
const result =await user.save();

access_token=JwtServices.sign({_id:result._id,role:result.role});

//generating refresh token
refresh_token=JwtServices.sign({_id:result._id,role:result.role},'1y', REFRESH_SECRET)
await RefreshToken.create({token:refresh_token})
console.log("acc",access_token)
  }
  catch(err)
  {

  }
  res.json({access_token:access_token,refresh_token:refresh_token})

  },
};
export default registerController;
