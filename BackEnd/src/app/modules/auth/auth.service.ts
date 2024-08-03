import jwt from 'jsonwebtoken';
import { TLoginUser } from "./auth.interface";
import config from '../../config/config';


const loginUser = async (payload: TLoginUser) => {
    //token create and return
    const accessToken =  jwt.sign(
        {payload}, config.secret as string,{expiresIn:'7d'}
    )
    return accessToken;
}

export const authServices = {
    loginUser,
}