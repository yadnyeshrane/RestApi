import Joi from "joi";
import { REFRESH_SECRET } from "../../Config";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtServices from "../../services/JwtServices";

const refreshController = {
 async refresh(req, res, next) {
      //validte the req body
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });
    const { error } = refreshSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    //Vdalidate whetehr the token in db or not
let refreshToken;
try{
    refreshToken=await RefreshToken.findOne({token:req.body.refresh_token})
    console.log("Refr",refreshToken)
    if(!refreshToken)
    {
        return next(CustomErrorHandler.authorize("Invalid refresh token"));
    }

    //extract the user id from refresh token
    let userId;
    try{
const {_id}=await JwtServices.verify(refreshToken.token,REFRESH_SECRET)
//got the it find the 
userId=_id;

    }
    catch(error)
    {
return next(CustomErrorHandler.authorize("Invalid token"))
    }

    //finding the user

    const user=await User.findOne({_id:userId})
    if(!user)
    {
        return next (CustomErrorHandler.authorize("no user found"))
    }

    const access_token=JwtServices.sign({_id:user._id, role:user.role});
    const refresh_token=JwtServices.sign({_id:user._id,role:user.role});
    res.json({access_token,refresh_token})
    

}
catch(error)
{
    console.log(error)
       return next(CustomErrorHandler.authorize("Something wen t wrong"));
}

  },
};
export default refreshController;
