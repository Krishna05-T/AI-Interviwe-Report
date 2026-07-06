import mongoose from "mongoose"

/**
 * - job description schema : ""
 * - resume text : ""
 * - Self description : ""
 * 
 * - MatchScore : Number
 * 
 * - Technical question : 
 *      [{
 *          question : ""
 *          intention : ""
 *          anwer : ""
 *      }] 
 * 
 * - Behavioral question : 
 *      [{
 *          question : ""
 *          intention : ""
 *          anwer : 
 *      }]
 * 
 * - Skill gaps :
 *      [{
 *          skill : ""
 *          severity : {
 *              type : String,
 *              enum : ["low", "medium", "high"]
 *          }
 *      }] 
 * 
 * - preparation plan : 
 *      [{
 *          day : Number,
 *          focus : String,
 *          tasks : [Stirng]
 *      }]
 *
 */

const techQuestionSchema = mongoose.Schema({
    question: {
        type: String,
        require: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        require: [true, " Intention is required"]
    },
    answer: {
        type: String,
        require: [true, "Answer is required"]
    }
}, { _id: false })

const behavioralQusestionSchema = mongoose.Schema({
    question: {
        type: String,
        require: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        require: [true, " Intention is required"]
    },
    answer: {
        type: String,
        require: [true, "Answer is required"]
    }
}, { _id: false })

const skillGapSchema = mongoose.Schema({
    skill: {
        type: String,
        require: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        require: [true, "Severity"]
    }
}, { _id: false })

const prepPlanSchema = mongoose.Schema({
    day: {
        type: String,
        require: [true, "day is required"]
    },
    focus: {
        type: String,
        require: [true, "focus is required"]
    },
    tasks: [
        {
            type : String,
            require : [true, "tasks is required"]
        }
    ]
})

const reportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        require: [true, "job description is required"]
    },
    resumeText: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestion: [techQuestionSchema],
    behavioralQuestion : [behavioralQusestionSchema],
    skillGap : [skillGapSchema],
    preparationPlan : [prepPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title: {
        type: String,
        require: [true, "title is required"]
    }

}, {timestamps :true })

export const Report = mongoose.model("reports", reportSchema)