const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required: true,
        unique:true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    visitedHistory: [{
        timestamp : {
            type:Number,
        }
    }]
},
{timestamps:true}
);

//model
const URL=mongoose.model("url",urlSchema);

module.exports = URL;