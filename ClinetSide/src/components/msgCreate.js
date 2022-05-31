function MsgCreate({ msg }) {
    if(msg.sent){
      return (
        <li className="clearfix">
          <div className="message-data">
            <span className="message-data-time">{msg.created}</span>
          </div>
      
          <div className="message other-message float-right">
            {" "}
            {msg.content}{" "}
          </div>
        </li>
      )
    }
    return (
      <li className="clearfix">
        <div className="message-data">
          <span className="message-data-time " >{msg.created}</span>
        </div>
        <div className="message other-message ">
          {" "}
          {msg.content}{" "}
        </div>
      </li>
    )
    }
    export default MsgCreate