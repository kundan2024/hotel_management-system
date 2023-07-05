import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker , Space } from 'antd';
import 'antd/dist/reset.css';
import moment from 'moment';
import { set } from 'mongoose';

const  {RangePicker} = DatePicker;

function Homescreen() {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fromdate,setFromDate]=useState();
    const [todate,setToDate]=useState();
    const[duplicaterooms , setDuplicateRooms]=useState([]);
    const[searchkey , setSearchKey]=useState('');
    const[type , setType]=useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/rooms/getallrooms');
                const data = response.data;
                setRooms(data);
                setDuplicateRooms(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

function filterByDate(dates)
    {
        const from=moment(dates[0].$d).format('DD-MM-YYYY');
        const to= moment(dates[1].$d).format('DD-MM-YYYY');
        setFromDate(from);
        setToDate(to);
         
        var temprooms= [];
        var availability = false;
        for(const room of duplicaterooms)
        {
            if(room.currentbookings.length>0)
            {
                for(const booking of room.currentbookings){
                    if(!moment(from).isBetween(booking.fromdate , booking.todate)&&
                    !moment(to).isBetween(booking.fromdate , booking.todate)){
                        if((from!==booking.fromdate)&&(from!==booking.todate)&&(to!==booking.fromdate)&&(to!==booking.todate)){
                                availability=true;
                                console.log("room removed");
                        }
                    }

                }
            }
            if(availability===true||room.currentbookings.length===0){
                temprooms.push(room);
            }
            setRooms(temprooms);
        }
    }

function filterBySearch(){
        const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setRooms(temprooms);
    }

    function filterByType(e){
        setType(e);
        if(e!=='all'){
        const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()===e.toLowerCase())
        setRooms(temprooms);
        }
        else{
            setRooms(duplicaterooms)
        }
    }

    return (
        <div className="container ">
            <div className="row mt-5 justify-content-center bs fixedbar" style={{background:'white'}}>
                <div className="col-md-3" >
                    <RangePicker format='DD-MM-YYYY'  onChange={filterByDate}/>
                </div>
                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder='Find your perfect stay...'
                    value={searchkey} onChange={(e)=>{setSearchKey(e.target.value)}}
                    onKeyUp={filterBySearch}
                    />
                </div>
                <div className="col-md-3">
                <select className="form-control" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="delux">Delux</option>
                    <option value="non-delux">Non-Delux</option>
                </select>
                </div>
            </div>




            <div className="row justify-content-center mt-5">
                {loading ? (<Loader/>) :error ? <Error/> : rooms.length>0 ? (rooms.map(room => (
                    <div className="col-md-9">
                        <Room room={room} fromdate={fromdate} todate={todate}/>
                    </div>
                ))) :(
                    <div className="col-md-9">
                        <h1 style={{marginTop:'60px'}}>Try different Combination...</h1>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default Homescreen;
