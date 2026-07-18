import { BlackList } from "../model/blacklist.model.js";
import { randomInt } from "crypto";
import { User } from "../model/user.model.js";
import { sendEmailService } from "../service/email.service.js";
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

const genrateOtp = () => {
    return randomInt(100000, 1000000).toString()
}

const userRegister = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    if (
        [fullname, username, email, password].some((field) => !field || field.trim() === "")
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

    const otp = genrateOtp()
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

    const user = await User.create({
        fullname,
        username,
        email,
        password,
        emailVerificationOtp : otp,
        emailVerificationOtpExpiresAt : otpExpiresAt,
        isEmailVerified : false
    })

    const createUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationOtp")
    if (!createUser) {
        throw new ApiError(401, "User is not create in database")
    }

     await sendEmailService(createUser.email, createUser.fullname, otp)
    return res
        .status(200)
        .json(
            new ApiResponse(200, "user is register successfully. OTP sent to email", createUser,)
        )

})

const verifyEmailOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "email and otp are required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "user is not found")
    }

    if (user.isEmailVerified) {
        throw new ApiError(400, "email is already verified")
    }

    if (user.emailVerificationOtp !== otp) {
        throw new ApiError(400, "invalid otp")
    }

    if (!user.emailVerificationOtpExpiresAt || user.emailVerificationOtpExpiresAt < new Date()) {
        throw new ApiError(400, "otp is expired")
    }

    user.isEmailVerified = true;
    user.emailVerificationOtp = undefined;
    user.emailVerificationOtpExpiresAt = undefined;

    await user.save({ validateBeforeSave : false })

    const verifiedUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationOtp")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "email verified successfully", verifiedUser)
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

    if (user.isEmailVerified === false) {
        throw new ApiError(403, "please verify your email before login")
    }

    const passwordCorrect = await user.checkPassword(password)

    if (!passwordCorrect) {
        throw new ApiError(400, "password is incorrect")
    }

    const loggedInUser = await User.findById(user._id)

    const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(user._id)

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
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
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
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
    verifyEmailOtp,
    loginUser,
    loggoutUser,
    getUser,
    UpdatePass,
}
