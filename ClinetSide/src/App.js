
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Regsiter from './components/Register';
import Chat from './components/chat';
import Davatar from './components/Davatar.png'
import exmp from './exmp.mp4'
import recExmp from './recExmp.mp3'
/*
var yossi = {
  nickname: "yossi",
  img: "https://bootdey.com/img/Content/avatar/avatar4.png",
}
var shimrit = {
  nickname: "shimrit",
  img: "https://bootdey.com/img/Content/avatar/avatar8.png",
}
var shalom = {
  nickname: "shalom",
  img: "https://bootdey.com/img/Content/avatar/avatar3.png",
}
var jon = {
  nickname: "jon",
  img: "https://bootdey.com/img/Content/avatar/avatar4.png",
}
var aviram = {
  nickname: "aviram",
  img: "https://bootdey.com/img/Content/avatar/avatar5.png",
}
var moshe={
  nickname: "moshe",
  img: "https://bootdey.com/img/Content/avatar/avatar7.png",
}


var Ymsg1={
  from:true,
  time:"10:10",
  data:"hello",
  type: "text"
}
var Ymsg2={
  from: false,
  time:"10:10",
  data:"hello",
  type: "text"
}
var Ymsg3={
  from: true,
  time:"10:11",
  data:"how are you today ?",
  type: "text"
}
var Ymsg4={
  from: false,
  time:"10:12",
  data:"im fine, how are you ?",
  type: "text"
}

var Smsg1={
  from:true,
  time:"10:10",
  data:"hello",
  type: "text"
}
var Smsg2={
  from: false,
  time:"10:10",
  data:"hello",
  type: "text"
}
var Smsg3={
  from: true,
  time:"10:11",
  data:"ss",
  type: "text"
}
var Smsg4={
  from: false,
  time:"10:12",
  data:"sss",
  type: "text"
}

var ShalomMsg1={
  from:true,
  time:"10:10",
  data:"hello",
  type: "text"
}
var ShalomMsg2={
  from: true,
  time:"10:10",
  data:"how are you ?",
  type: "text"
}
var ShalomMsg3={
  from: true,
  time:"10:11",
  data:"stop ghosting me!!",
  type: "text"
}

var Jmsg1={
  from:true,
  time:"10:10",
  data:"hello",
  type: "text"
}
var Jmsg2={
  from: false,
  time:"10:10",
  data: <img src={Davatar} />,
  type: "image"
}
var Jmsg3={
  from: true,
  time:"10:11",
  data:<video controls >
  <source src={exmp}></source>
</video>,
  type: "video"
}
var Jmsg4={
  from: false,
  time:"10:12",
  data:<audio controls >
  <source src={recExmp}></source>
</audio>,
  type: "audio"
}

var Amsg1={
  from:true,
  time:"10:10",
  data:"hello",
  type: "text"
}
var Amsg2={
  from: false,
  time:"10:10",
  data:"hello",
  type: "text"
}
var Amsg3={
  from: true,
  time:"10:11",
  data:<audio controls >
  <source src={recExmp}></source>
</audio>,
  type: "audio"
}
var Amsg4={
  from: false,
  time:"10:12",
  data:"nice music",
  type: "text"
}



var yossiMessages=[Ymsg1,Ymsg2,Ymsg3,Ymsg4];
var shimritMessages=[Smsg1,Smsg2,Smsg3,Smsg4];
var shalomMessages=[ShalomMsg1,ShalomMsg2,ShalomMsg3]
var jonMessages=[Jmsg1,Jmsg2,Jmsg3,Jmsg4]
var aviramMessages=[Amsg1,Amsg2,Amsg3,Amsg4]
var adiContacts=[yossi,shimrit,shalom,jon,aviram]
var adiChats=[yossiMessages,shimritMessages,shalomMessages,jonMessages,aviramMessages]
var adi = {
  id: "adi123",
  pw: "12345",
  nickname: "adi",
  img: "https://bootdey.com/img/Content/avatar/avatar2.png",
  contact: adiContacts,
  chat: adiChats
}

var friendList=[adi,yossi,shimrit,shalom,jon,aviram,moshe]
var members = [adi];*/
var id,i
var connection
const serverUrl="https://localhost:7000"
function setId(userId) {
  id = userId;
}
function setConnect(c) {
  connection = c;
}

function App() {
 
  const [Count, setCountQuery] = useState(1);
  if (Count == 1) {//login-screen
    return (
      <div className="App1"  >

        <Login setCountQuery={setCountQuery}   setId={setId} connection={ connection} setConnect={setConnect} serverUrl={serverUrl}    />
        
      </div>
    );
  }
  if (Count == 2) {// register screen
    return (
      <div className="App2">
        <Regsiter setCountQuery={setCountQuery} serverUrl={serverUrl} />
      </div>
    );
  }
  if (Count == 3) { // chat screen
    return (
      
      <div className="App3">

        <Chat    id={id}  connection={ connection} serverUrl={serverUrl} />
      </div>
    );
  }
}


export default App;


