import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUser= async(payload:TUser)=>{
    console.log(payload)
    const result= User.create(payload)
    return result
}




export const userService={
    createUser
}