import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        require : true,
    },
    username : {
        type : String,
        require : [true, "this field is require"],
        unique : [true, "username is already exist"]
    },
    email : {
        type : String,
        require : true,
        lowercase : true,
        unique : [true, "email is already exist"],
    },
    password : {
        type : String,
        require : [true, "passward is required"]
    },
    refreshToken : {
        type : String
    },
},{ timeseries : true})


userSchema.pre("save", async function () {
    if(!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = async function () {
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}
userSchema.methods.genrateRefreshToken = async function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}
export const User =  mongoose.model("users", userSchema)
