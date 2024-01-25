import { TUser } from "./user.interface"

const createUser=(payload:TUser)=>{
    console.log(payload)
}
export const userService={
    createUser
}