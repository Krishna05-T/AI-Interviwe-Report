import mongoose from "mongoose"

const blacklistToken = new mongoose.Schema({
    token: {
        type: String,
        require: [true, "token is not availabel"]
    }
}, { timestamps: true })

export const BlackList = mongoose.model("blacklists", blacklistToken)