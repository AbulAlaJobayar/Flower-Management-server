import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { productRouter } from "../modules/product/product.route";

const router =Router()
const moduleRoutes=[
    {
        path:'/user',
        route:userRouter
    },
    {
        path:'/product',
        route:productRouter
    }
]
moduleRoutes.forEach((route)=>router.use(route.path, route.route))
export default router