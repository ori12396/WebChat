import { useState, useEffect } from 'react';
import Davatar from './Davatar.png'
function Contact({c,index,setIndex}) {
    const func=function(){//update the current index of the contact member, to show the current chat log,
        setIndex(index)
    }
   
    if(c.last==null){//new chat
        return (
            <li className="clearfix" onClick={func} >
            <img
                    src={Davatar}
                    className="avatar"
                />
                <div className="about">
                    <div className="name">{c.name}</div>
                    <div className="status">
                    There are not messages yet.
                    </div>
                </div>
            </li>
        )
    }

        return (
            <li className="clearfix" onClick={func} >
                <img
                    src={Davatar}
                    className="avatar"
                />
                <div className="about">
                    <div className="name">{c.name}</div>
                    <div className="status">
                    {c.lastdate}:  {c.last}
                    </div>
                </div>
            </li>
        );
}

export default Contact;