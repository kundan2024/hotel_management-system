const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
      },
      roomid : {
        type: String,
        required: true
      },
      user_id: {
        type: String,
        required: true
      },
      fromdate: {
        type: Date,
        required: true
      },
      todate: {
        type: Date,
        required: true
      },
      totalamount: {
        type: Number,
        required: true
      },
      totaldays: {
        type: Number,
        required: true
      },
      transactionId: {
        type: String,
        required: true
      },
      status: {
        type : String,
        required: true,
        default:'booked'
      }
},{timestamps : true,})

const bookingModel = mongoose.model('bookings',bookingSchema);

module.exports=bookingModel;