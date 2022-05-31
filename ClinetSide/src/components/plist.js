import { useState, useRef,useEffect } from "react"
import axios from 'axios'
import Davatar from './Davatar.png'

function Plist({ id,refresh,setRefresh, contaclist, connection,serverUrl }) {
    //const [flag,setFlag]=useState(false)
    const [friendId,setFriendId]=useState("")
    const [friendNickname,setFreindNickName]=useState("")
    const [friendServer,setFriendServer]=useState("")
   

    
    if(connection!=null){
            
        connection.on('addContact', async function () {
            setRefresh(!refresh);
        })
        }
 
    const friendIdChangeHandler=(e)=>{
        setFriendId(e.target.value)
    }
    const friendnickNameChangeHandler=(e)=>{
        setFreindNickName(e.target.value)
    }
    const friendServerChangeHandler=(e)=>{
        setFriendServer(e.target.value)
    }

    async function addFriendToContactList(){
        try{
            const newFriend={"Id":friendId, "Name":friendNickname,"Server":friendServer}
            console.log(serverUrl)
            const retVal=await axios.post(serverUrl+"/api/Contacts?userId="+id ,newFriend)
            if(retVal.status==200){
                
       try{
            const newFriend={"from":id,"to":friendId,"server":"localhost:7000"}
            const retVal=await axios.post("https://" + friendServer + "/api/invitations/" ,newFriend)
            if(retVal.status==200){
              setRefresh(!refresh)
            }
        }catch(error){}
            }
        }catch(error){alert("Friend is already at your contactlist")}
    }

     const addFriend =async function(){
        await addFriendToContactList();
        rest();
    }

    const rest = function () {
        document.getElementById("friendNickname").value="" 
        document.getElementById("friendId").value=""
        document.getElementById("friendServer").value=""  
    }
    

    return (
        <div>
            <div id="plist" className="people-list">
                <div className="row-heading">
                    <div className="col-sm-3 col-xs-3 heading-avatar">
                        <div className="heading-avatar-icon">
                            <img src={Davatar} />
                        </div>
                        <div className="myn"> {id}</div>
                        <div className="new-conv">
                            <i className="fa fa-comments fa-2x  pull-right" aria-hidden="true" data-bs-toggle="modal"
                                data-bs-target="#contactPopup"  />

                        </div>
                    </div>
                </div>

                <div className="seperate">
                    <div className="input-group-prepend">
                    </div>

                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0" >{contaclist}
                </ul>
            </div>
            <div
                className="modal fade"
                id="contactPopup"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add new contact
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={rest}
                            />
                        </div>
                        <div className="modal-body">
                        <label>Contact Id</label>
                            <input type="text" id="friendId" onChange={friendIdChangeHandler}/>
                            <label>Contact nickname</label>
                            <input type="text" id="friendNickname"  onChange={friendnickNameChangeHandler} />
                            <label>Contact server</label>
                            <input type="text" id="friendServer"  onChange={friendServerChangeHandler}/>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={rest}
                            >
                                Close
                            </button>
                             <button type="button" className="btn btn-primary" onClick={addFriend} data-bs-dismiss="modal" >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Plist;