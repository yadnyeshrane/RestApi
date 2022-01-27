class CustomErrorHandler extends Error
{
    constructor(status,message)
    {
        super();
        this.status=status
        this.message=message;
    }
    static alreadyExist(message)
    {
        return new CustomErrorHandler(409,message)
    }
    static wrongCredentails(message="Username and passord are wrong")
    {
        return new CustomErrorHandler(401,message)
    }
    static authorize(message="anuthorized")
    {
        return new CustomErrorHandler(401,message);
    }
    static notFound(message="User not found")
    {
        return new CustomErrorHandler(401,message);
    }
}

export default CustomErrorHandler;