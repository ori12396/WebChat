function ChatBox({contaclist,Index,messagesList,sendMsg,handleEnter}){
    if(Index==-1){
        return
    }
    return (
        <div className="chat" >

        <div className="chat-header clearfix">
            <div className="row">
                <div className="col-lg-6" >

                    {contaclist[Index]}

                </div>
            </div>
        </div>
        <div className="chat-history" id='chatHistory' >
            <ul className="m-b-0" >
                {messagesList}
            </ul>

        </div>

        <div className="chat-message clearfix">
            <div className="input-group mb-0">
                <div className="input-group-prepend">
                    <button className="input-group-text" onClick={sendMsg}>
                        <i className="fa fa-send" />
                    </button>

                </div>
                <input type="text" className="form-control" placeholder="Enter text here..." size={100} id="msg" onKeyDown={handleEnter} />
            </div>
            <div className="col-lg-6 hidden-sm text-right">
                <button href="#!" className='btn btn-outline-secondary'><i className="fa fa-microphone" aria-hidden="true"></i></button>
                <button
                    href="#!"
                    className="btn btn-outline-primary"
                >
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                </button>
                <button
                    href="#!"
                    className="btn btn-outline-info"
                >
                    <i className="fa fa-video-camera" aria-hidden="true"></i>
                </button>


            </div>
        </div>
    </div>  
    );
}
export default ChatBox