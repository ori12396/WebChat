import axios from "axios";
import React, { useState } from "react";
import Davatar from './Davatar.png'
import './form.css'
function Regsiter({setCountQuery, serverUrl}) {
    const[idAlert,setIdAlert]=useState("Please enter a User name")
    const[pwAlert,setPwAlert]=useState("Please enter a password")
    const[cpwAlert,setCpwAlert]=useState("Please confrim your password")
    const[nameAlert,setnameAlert]=useState("Please enter a display name")
    const[image,setImage]=useState("")
    const handleChange= function(e){
        if(image==""){
           setImage(URL.createObjectURL(e.target.files[0]));
        }
         
    }
    const idCheck=()=>{
        let check=true
        var username=document.getElementById("username").value;
        if(username!=""&&!containsLetter(username)){
            setIdAlert("Please make sure your username contains at least one letter.");
            check=false
        }
        if(username==""){
            setIdAlert("Please enter a User name") 
        }
        if(check&&username!=""){
            setIdAlert("")
        }

    }
    const pwCheck=()=>{
        let check=true
        var password=document.getElementById("pw").value;
        var cpw=document.getElementById("cpw").value;
        if(password==""){
            setPwAlert("Please enter a Password")
            check=false
        }
        if(password!=""&&(!containsLetter(password)||!containsNumber(password))){
            setPwAlert("Please make sure your password contains at least one letter and one number.");
            check=false;
        }
        if(password==""){
            setPwAlert("Please enter a Password")
        }
        if(check&&password!=""){
            setPwAlert("")
            if(password==cpw){//update "real time"
                setCpwAlert("")
            }
            else{
                setCpwAlert("Password and confirm password does not match.")
            }
        }

    }
    const cpwCheck=()=>{
        let check=true
        var password=document.getElementById("pw").value;
        var cpw=document.getElementById("cpw").value;
        if(cpw==""&&password!=""){
            setCpwAlert("Please confirm your password.");
            check=false;
        }
        if(password!==cpw){
            setCpwAlert("Password and confirm password does not match.");
            check=false;
        }
        if(cpw==""){
            setCpwAlert("Please confrim a Password")
        }
        if(check&&cpw!=""){
            setCpwAlert("")
        }

    }
    const nickNameCheck=()=>{
        var check=true
        var name=document.getElementById("name").value;
        if(name==""){
            setnameAlert("Please enter a display name")
        }
        if(check&&name!=""){
            setnameAlert("")
        }
    }
    
    const setter1 =async function (event) {
        var username=document.getElementById("username").value;
        var name=document.getElementById("name").value;
        var password=document.getElementById("pw").value;
        event.preventDefault()
        if(idAlert==""&&pwAlert==""&&nameAlert==""&&cpwAlert==""){//validation is good.
            try{
                const newUser={"id":username,"nickname":name,"password":password}
                const retStatus=await axios.post(serverUrl+"/api/Register",newUser);
                if (retStatus.status == 200){
                    alert("Registration is completed")
                    setCountQuery(1) 
                }
            }
            catch(error){setIdAlert("user already exist")}   
        }
    }
    const goToLogin=function(){
        setCountQuery(1);
    }
    return (
        <div>
            <form className="form" >
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill  this form to create an account.</p>
                    <hr />
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" name="" placeholder="Enter Username" id="username" onChange={idCheck} />
                    {idAlert&&(<p className="error" id="error">{idAlert}</p>)}
                    <label htmlFor="pw"><b>Password</b></label>
                    <input type="password" name="password" placeholder="Enter password" id="pw" onChange={pwCheck}/>
                    {pwAlert&&(<p className="error" id="error">{pwAlert}</p>)}
                    <label htmlFor="cpw"><b>Confirm your password</b></label>
                    <input type="password" name="cpassword" placeholder="Enter your password again" id="cpw" onChange={cpwCheck} />
                    {cpwAlert&&(<p className="error" id="error">{cpwAlert}</p>)}
                    <label htmlFor="nick"><b>Nickname(maximum 16 chars)</b></label>
                    <input type="text" name="" placeholder="Enter your display name" id="name"  onChange={nickNameCheck} />
                    {nameAlert&&(<p className="error" id="error">{nameAlert}</p>)}
                    <hr/>
                    <button className="input-submit" type="submit" onClick={setter1}>Register</button>
                    <p>Not registered? 
                    <a href="#" onClick={goToLogin}>Click here</a> to register
                    <br></br>
                    <a href="http://localhost:5162/" >Rate us</a>
                    </p>
                    
                </div>

            </form>
        </div>
    );
}
export default Regsiter;

function containsNumber(str){
    return /\d/.test(str);
}
function containsLetter(str){
    return /[a-zA-Z]/.test(str);
}