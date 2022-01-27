import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtServices from "../services/JwtServices";

const auth = async(req, res, next) => {
  let authUser = req.headers.authorization;
  if (!authUser) {
    return next(CustomErrorHandler.authorize());
  }
  const token = authUser.split(" ")[1];

  try {
    const { _id, role } = await JwtServices.verify(token);
    const user = {
      _id,
      role,
    };
    req.demo = user;
    next();
  } catch (err) {
    return next(CustomErrorHandler.authorize());
  }
};
export default auth;
