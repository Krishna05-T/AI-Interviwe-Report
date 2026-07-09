import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { BlackList } from "../model/blacklist.model.js"

export const JWTverify = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    
        if(!token) {
            throw new ApiError(401, "token not found")
        }
    
        const isTokenBlacklist = await BlackList.findOne({ token })

        if(isTokenBlacklist) {
            throw new ApiError(400, "Token is invalid")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN)
        const user = await User.findById(decodedToken._id)
    
        if(!user) {
            throw new ApiError(401, "User not found by token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(error.statusCode || 401, error.message || "invalid access")
    }

})
