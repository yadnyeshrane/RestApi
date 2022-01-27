import { DEBUG_MODE } from "../Config";
import {ValidationError} from 'joi'
import CustomErrorHandler from "../services/CustomErrorHandler";

const errorHandling=(err,req,res,next)=>{
    
    let statuscode=500;
    let data={
        message:"Internal Server error",
        ...(DEBUG_MODE==="true" &&{originalError:err.message})
    }

    //check joi validation
    // The instanceof operator in JavaScript is used to check the type of an object at run time. It returns a
    //  boolean value if true then it indicates that the object is an instance of a particular class and if false then it is not.


    if(err instanceof ValidationError)
    {
        statuscode=422;
        data={
        message:err.message
        }
    }

    if(err instanceof CustomErrorHandler)
    {
        statuscode=err.status,
        data={
            message:err.message
        }
    }



    return res.status(statuscode).json(data)


}
export default errorHandling;