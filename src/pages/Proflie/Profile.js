import React, { useEffect, useState } from 'react';
import {
    useLocation
} from "react-router-dom";
import { getUser } from '../../api/user';

export default function Profile(props) {
    let query = new URLSearchParams(useLocation().search).get("username");
    const [user,setUser]=useState("");
    useEffect( ()=>{
        getUser(query).then( (res)=>{
            console.log("data",res.data);
            setUser(res.data)
        })
    },[])
    return (
        <div>
            <p>chao anh em</p>
            <p>{user.last_name}</p>
        </div>
    )
}
