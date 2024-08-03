import { TUser } from "./user.interface";
import { User } from "./user.model";

const addNewUser = async (userData : TUser) => {
    const result = await User.create(userData);
    return result;
}

const getUserData = async (email: string) => {
    console.log(email);
    const result = await User.find({ email: email });
    console.log(result);
    return result;
}

export const userServices = {
    addNewUser,
    getUserData,
}