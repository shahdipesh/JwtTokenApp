import React from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './features.css';
import { Button } from 'react-bootstrap';
import {setUsers} from '../../app/user/user.actions'
import setLoginStatus from '../../app/user/user.actions'
const axios = require('axios').default;
const Features = () => {
  const dispatch = useDispatch()
    const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn)
    var users=useSelector((state) => state.user.users);

    const refresh = async (refreshToken) => {
       console.log('Refreshing token');
       return new Promise((resolve, reject) => {
        axios
        .post("http://localhost:8080/api/generateToken", { token: refreshToken })
        .then(data => {
          const accessToken =  data.data.token;
          console.log(accessToken);
         console.log("New access token is generated in refresh function",accessToken);
          Cookies.set("access", accessToken,{expires:new Date(new Date().getTime() + 5000)});
          resolve(accessToken);
        })
        .catch((err) => {
          console.log(err);
          
        });
      })

    }

    const hasAccess = async (accessToken, refreshToken) => {
        console.log("Inside has access");
        console.log("ACcess",accessToken);
        console.log("Refresh",refreshToken);
           if(!refreshToken) {return null;}
           if(accessToken == undefined) { 
            console.log("Handling when access token is undefined");
             accessToken = await refresh(refreshToken); 
             console.log("I am getting the new token generated in refresh function")
             return accessToken
            }
           return accessToken;
    }

     const getAllUsers=async()=>{
       var accessToken =(Cookies.get('access'))
       var refreshToken =(Cookies.get('refresh'))
       console.log("Access",accessToken);
        accessToken = await hasAccess(accessToken,refreshToken)
        console.log("access token after button press",accessToken);
         axios.get('http://localhost:8080/api/getAllUsers',{
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then((response)=>{
           dispatch(setUsers(response.data));
         })
         .catch(e=>{
           console.log("=====Inside catch of allUser",accessToken);
           alert("Session expired/invalid");
            dispatch(setUsers(null))
           dispatch(setLoginStatus(false))
          });
    }
 return (
   <div className="features-container">
       This is the feature page
       <div className="features">
         {users?users.map(user=>{
           return <div style={{display: 'flex'}}>{user.userName}</div>
         }):null}
  {!isUserLoggedIn?
  <div className="features-children">
    <b>Please login</b>
  <Button variant="primary" disabled>GetAllUsers</Button>
  </div>
:<Button variant="primary" className="features-children" onClick={()=>{getAllUsers()}}>GetAllUsers</Button>}
   </div>
   </div>
 )
}

export default Features;