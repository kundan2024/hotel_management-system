const mongoose =  require("mongoose");

var mongoURL = 'mongodb+srv://harishbisu94:7890@cluster0.tdcpdmo.mongodb.net/hotel-management'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})

var connection = mongoose.connection

connection.on('error',()=>{
    console.log('mongo DB connection failded')
})

connection.on('connected',()=>{
    console.log('mongo DB connection success')
})

module.exports = mongoose;