import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from "moment";
import { Tabs } from 'antd';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Divider, Space, Tag } from 'antd';

const Profilescreen = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

         const user = JSON.parse(localStorage.getItem('currentUser'));
         if(!user)
         {
            window.location.href='/login'
         }
  

  return (
    <div className='ml-3'>
      <Tabs defaultActiveKey={activeTab} onChange={handleTabChange}>
        <Tabs.TabPane tab="Profile" key="1">
          <b><h1 className="text-left  bs">Profile</h1></b>
        <div className=" mt-3 bs text-left col-md-6">
        
         <h1>Name : {user.data.name}</h1>
         <h1>Email : {user.data.email}</h1>
         <h1>Admin : {user.data.isAdmin?<a href="/admin"><Tag color="green">Approved</Tag></a>:<Tag color="red">Denied</Tag>}</h1>
         </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Booking" key="2">
        <b><h1 className="text-left  bs">My Bookings</h1></b>
          <MyBookings />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profilescreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings,setBookings] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const data = await(await axios.post('/api/bookings/getbookingbyuserid', { userid: user.data._id })).data;
            setLoading(false);
            console.log(data);
            setBookings(data);
          } catch (error) {
            console.error(error);
            setError(true);
            setLoading(false);
          }
        };
        fetchData();
      }, [user.data._id]);
  async function cancelBooking(bookingid, roomid){
    try {
      setLoading(true);
      const result = await(await axios.post("/api/bookings/cancelBooking",{bookingid,roomid})).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats","Your booking has been cancelled",'success').then(result=>{
        window.location.reload();
      });
      // if(result){
      //   window.location.reload();
      // }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
      Swal.fire('Oops !!!','Something went wrong.','error');
    }
  }

  return (
    <div>
    {loading &&<Loader style={{align: 'center'}}/>}
    {error && <Error/>}
      <div className="row">
        <div className="col-md-6">
            {bookings&&(bookings.map(booking=>{
               return <div className='bs text-left'>
                    <h1>{booking.room}</h1>
                    <p><b>BookingId :</b> {booking._id}</p>
                    <p><b>Check IN :</b> {moment(booking.fromdate).format('DD-MM-YYYY')}</p>
                    <p><b>Check Out : </b>{moment(booking.todate).format('DD-MM-YYYY')}</p>
                    <p><b>Amount Paid :</b> {booking.totalamount}/-</p>
                    <p><b>Status :</b> {booking.status==='booked'?<Tag color="green">Confirmed</Tag>:<Tag color="red">Cancelled</Tag>}
                    {booking.status==='booked'?
                      (<div className='text-right'>
                      <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}> CANCEL BOOKING</button>
                      </div>
                      )
                      :<h1></h1>
                    }
                    </p>
                    
                </div>
            }))}
        </div>
      </div>
    </div>
  );
}


