const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ssiri2409:2ORBp3EQSkZaKXha@crimson.ognoqej.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);
})
