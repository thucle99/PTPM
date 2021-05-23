import React,{useState,useEffect} from 'react'
import {getUser} from '../../api/user'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation
  } from "react-router-dom";
import styles from "./Profile.module.scss";

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
