import { BlackList } from "../model/blacklist.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const genrateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.genrateAccessToken();
        const refreshToken = await user.genrateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(400, "token are not genrated")
    }
};

const userRegister = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    if (
        [fullname, username, email, password].some((field) => { field?.trim === "" })
    ) {
        throw new ApiError(400, "All field are required")
    }

    if (!email.includes("@")) {
        throw new ApiError(401, "email is invalid")
    }

    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existUser) {
        throw new ApiError(401, "user is already exist")
    }

    const user = await User.create({
        fullname,
        username,
        email,
        password
    })

    const createUser = await User.findById(user._id).select("-password -refreshtoken")
    if (!createUser) {
        throw new ApiError(401, "User is not create in database")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "user is register successfully", createUser,)
        )

})

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(401, "enter any field")
    }

    if (email && !email.includes("@")) {
        throw new ApiError(400, "email is invalid")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(400, "user is not exist")
    }

    const passwordCorrect = await user.checkPassword(password)

    if (!passwordCorrect) {
        throw new ApiError(400, "password is incorrect")
    }

    const loggedInUser = await User.findById(user._id)

    const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(user._id)

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                "User login successfully",
                { loggedInUser, accessToken, refreshToken }
            )
        )
})

const loggoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )

    const token = await User.findOne(req.user?.accessToken)

    if(token) {
        await BlackList.create({
            token,
        })
    }

    const option = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(
        new ApiResponse(200, "Useer logout successfully", {})
    )
})

const getUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, "fetching current user data successfully", req.user)
    )
})

const UpdatePass = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword, confirmPass} = req.body;

    if(!oldPassword || !newPassword || !confirmPass) {
        throw new ApiError(400, "all field are required")
    }

    if(newPassword !== confirmPass) {
        throw new ApiError(400, "new password and confirm password are not match")
    }

    const user = await User.findById(req.user._id);
    const isPasswordCorrect = await user.checkPassword(oldPassword)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "password is incorrect")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave : false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, "password change successfully", {})
    )

})
export {
    userRegister,
    loginUser,
    loggoutUser,
    getUser,
    UpdatePass,
}