const express = require('express');
const router = express.Router();
const Room = require("../models/room");
const Booking = require("../models/booking");

router.post("/bookroom", async (req, res) => {
  const {
    room,
    user_id,
    fromdate,
    todate,
    totalamount,
    totaldays
  } = req.body;

 

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      user_id,
      fromdate: fromdate,
      todate: todate,
      totalamount,
      totaldays,
      transactionId: '123453'
    });

    const booking = await newbooking.save();
    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate, todate: todate, userid: user_id, status: booking.status });
    await roomtemp.save();
    res.send('Room booked successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid",async(req,res)=>{
  const userid=req.body.userid;
  try {
    const bookings = await Booking.find({user_id : userid});
    res.send(bookings);
  } catch (error) {
      return res.status(400).json({message:error});
  }
});

router.post("/cancelBooking",async(req,res)=>{
  const {bookingid,roomid}=req.body;
  try {
    
  const bookingitem =await Booking.findOne({_id:bookingid});
  bookingitem.status = 'cancelled';
  await bookingitem.save();
  const room = await Room.findOne({_id : roomid});
  const bookings = room.currentbookings;
  const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
  room.currentbookings=temp;
  await room.save();
  res.send("Your booking got cancelled, Successfully")
  } catch (error) {
    return res.status(400).json({error});
  }
});

router.get("/getallbookings",async(req,res)=>{
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({error});
  }
});

module.exports = router;
