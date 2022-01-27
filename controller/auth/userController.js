import { User } from "../../models"
import CustomErrorHandler from "../../services/CustomErrorHandler"


const userController={
   async me(req,res,next)
    {
        try{
const user=await User.findOne({_id:req.demo._id})
if(!user)
{
    return next(CustomErrorHandler.notFound());
}
res.json(user)
        }
        catch(err){
            console.log(err)
return next(err);
        }
    }
}
export default userController;