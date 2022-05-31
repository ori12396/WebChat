import { useState } from 'react';
import './form.css'
import axios from "axios";
import * as signalR from "@microsoft/signalr"
function Login({ setCountQuery,  setId,connection,setConnect,serverUrl }) {
    
    const[idAlert,setIdAlert]=useState("Please enter a User name")
    const[pwAlert,setPwAlert]=useState("Please enter a Password")
    const idCheck=()=>{
        if (document.getElementById("username").value!=""){
            setIdAlert("")
        }
        else{
            setIdAlert("Please enter a User name")
        }
    }
    const pwCheck=()=>{
        if (document.getElementById("pw").value!=""){
            setPwAlert("")
        }
        else{
            setPwAlert("Please enter a Password")
        }
    }
    const goToChat = async function (event) {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("pw").value;
        
        if(username!=""&&password!=""){
            try{
                const newLogin={"id":username,"password":password};
                const retStatus=await axios.post(serverUrl+"/api/Login",newLogin);
                    if (retStatus.status == 200){
                          connection=new signalR.HubConnectionBuilder().withUrl(serverUrl+"/chat").configureLogging(signalR.LogLevel.Information).withAutomaticReconnect().build();   
                         // setConnect(connection)
                         //connection = connect
                         //setConnection(connect)
                        
                        alert("Login successfully")
                        setId(username) 
                        await connection.start()
                        setConnect(connection)
                        setCountQuery(3) 
                    } 
            } catch(error){alert("Id or Password is incorrect")}
        }
        
    }

    const goToRegister = function () {
        setCountQuery(2);
    }
    
    return (
        <div>
            <form className="form">
                <div className="container">
                    <h1>Log-in</h1>
                    <p>Please fill this form to sign in.</p>
                    <hr/>
                    <label htmlFor="username"><b>User name</b></label>
                    <input type="text" name="id" placeholder="Enter Username" id="username" required onChange={idCheck} />
                    {idAlert&&(<p className="error" id="error">{idAlert}</p>)}
                    <label htmlFor="pw"><b>Password</b></label>
                    <input type="password" name="pw" placeholder="Enter password" id="pw" required onChange={pwCheck} />
                    {pwAlert&&(<p className="error">{pwAlert}</p>)}
                    <hr/>
                    <button className="input-submit" type="submit" onClick={goToChat}>Login</button>
                </div>
                <div className="already">
                <p>Not registered? 
                    <a href="#!" onClick={goToRegister}>Click here</a> to register
                    <br></br>
                    <a  href="http://localhost:5162/" >Rate us</a>
                    </p>
                    
                </div>

            </form>

        </div>
    );
};
export default Login;