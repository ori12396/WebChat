import './chat.css'
import { useState, useEffect } from 'react';
import Contact from './contact';
import MsgCreate from './msgCreate';
import Plist from './plist';
import ContactInfo from './contactInfo';
import ChatActions from './chatActions';
import HeadLine from './headLine';
import axios from 'axios';


function Chat({   id,  connection ,serverUrl}) {
    function currentTime() {
        var today = new Date();
        var minutes
        if (today.getMinutes() < 10) {
            minutes = "0" + today.getMinutes()
        } else {
            minutes = today.getMinutes()
        }
        return today.getHours() + ":" + minutes;
    }
    //let messages
    const [Chat, setChat] = useState(true);
    const [Index, setIndex] = useState(-1);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [msgReload, SetMsgReload] = useState(true);
    useEffect(() => { //scroll bottom
        var objDiv = document.getElementById("chatHistory");
        objDiv.scrollTop = objDiv.scrollHeight;
    })
    let index = -1;
    //var contacts //= members[i].contact
    useEffect(() => {

        async function f() {
            try {
                const retStatus = await axios.get(serverUrl+"/api/Contacts?userId=" + id);
                if (retStatus.status == 200) {
                    var data = retStatus.data;
                    setContacts(data)
                }
            } catch (error) { alert("error") }
        }
        f()
    }, [refresh])
    if(connection!=null){
    connection.on('reviceMsg', async function () {
        SetMsgReload(!msgReload);
    })
    }



    let contaclist = contacts.map((c, key) => {
        index++

        return <Contact c={c}   index={index} setIndex={setIndex} key={key} /> //create the contact card
    });

    let contaclistInfo = contacts.map((c, key) => { //create the contact card in headline
        return <HeadLine c={c} key={key} />
    });
    useEffect(() => {
        async function f() {
            if (Index == -1) { // default no msg, use to navigate between the chat's
                setMessages([])
            } else {
                try {
                    const retStatus = await axios.get(serverUrl+"/api/Contacts/" + contacts[Index].id + "/messages?userId=" + id);
                    if (retStatus.status == 200) {
                        var data = retStatus.data;
                        setMessages(data)
                    }
                } catch (error) { alert("error") }
            }

        }
        f()
    }, [Index, msgReload])

    let messagesList = messages.map((msg, key) => { //create msg's 
        return <MsgCreate msg={msg} key={key} />
    })
    async function sendMsgOnBothServer(message) {
        try {
            const retVal = await axios.post(serverUrl+"/api/Contacts/" + contacts[Index].id + "/messages?userId=" + id + "&content=" + message)
            if (retVal.status == 200) {
                //SetMsgReload(!msgReload)
                try {
                    const msgToSend = { "from": id, "to": contacts[Index].id, "content": message }
                    const retVal = await axios.post(serverUrl+"/api/transfer/", msgToSend)
                    if (retVal.status == 200) {
                       SetMsgReload(!msgReload)
                    }
                } catch (error) { alert(contacts[Index].id + " didnt add you to his contact list ") }
            }
        } catch (error) { alert("error in post ") }
    }
    const sendMsg = function () { //text msg 
        let message = document.getElementById("msg").value;
        if (message != "") {
            sendMsgOnBothServer(message);
            document.getElementById("msg").value = "";
        }
    }
    const handleEnter = function (e) {
        if (e.key === "Enter") {
            sendMsg()
        }
    }
    if (Index == -1) {// if no chat yet
        return (
            <div>

                <link
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    rel="stylesheet"
                />
                <div className="container">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card chat-app">
                                <Plist  id={id} refresh={refresh} setRefresh={setRefresh} contaclist={contaclist}  connection={ connection} serverUrl={serverUrl} />
                                <div className="chat" >

                                    <div className="noChat" id='chatHistory' >
                                        <ul className="m-b-0" >

                                        </ul>

                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <h4  ><a  href="http://localhost:5162/" >Rate us</a></h4>
            </div>
        );
    }
    return (
        <div>

            <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                rel="stylesheet"
            />

            <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <Plist  id={id} refresh={refresh} setRefresh={setRefresh} contaclist={contaclist}  connection={ connection} serverUrl={serverUrl} />
                            <div className="chat" >
                                <ContactInfo contact={contaclistInfo[Index]} />

                                <div className="chat-history" id='chatHistory' >
                                    <ul className="m-b-0" >
                                        {messagesList}
                                    </ul>

                                </div>
                                <ChatActions Index={Index} sendMsg={sendMsg} handleEnter={handleEnter}  setChat={setChat} Chat={Chat} currentTime={currentTime} />

                            </div>

                        </div>
                    </div>
                </div>
            </div>

           <h4  ><a  href="http://localhost:5162/" >Rate us</a></h4> 
        </div>

    );
}
export default Chat;