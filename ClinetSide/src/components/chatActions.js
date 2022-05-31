import { useState, useRef, useEffect } from "react"
let mediaRecorder//global var 
function ChatActions({ Index, sendMsg, handleEnter,  setChat, Chat, currentTime }) {
    const [imgUrl, setImgUrl] = useState("")
    const [vidUrl, setVidUrl] = useState("")
    const [audUrl, setAudUrl] = useState("")
    var time
    const [errorMessage, setErrorMessage] = useState("")
    const [errorAudMessage, setErrorAudMessage] = useState("")
    const clear = () => {// clear url ,input and errormsg
        console.log("bla")
        document.getElementById("imageInput").value = "";
        document.getElementById("videoInput").value = "";
        setErrorMessage("")
        if(clickCounter.current%2==0){//handle aud error mesg
            setErrorAudMessage("")
        }
        if(clickCounter.current%2==1&&audUrl==""){//handle aud error mesg
            setErrorAudMessage("Please finish  recording")
        }
        setImgUrl("")
        setVidUrl("")
        setAudUrl("")
            
    }
    const handleImgChange = function (e) {
        if (imgUrl == "") {
            setErrorMessage("")
            setImgUrl(URL.createObjectURL(e.target.files[0]))
        }
        if(imgUrl!="" && document.getElementById("imageInput").value =="" ){
            setImgUrl("")
        }

    }
    const handleVidChange = function (e) {
        if (vidUrl == "") {
            setErrorMessage("")
            setVidUrl(URL.createObjectURL(e.target.files[0]))
        }
        if(vidUrl!="" && document.getElementById("videoInput").value =="" ){
            setVidUrl("")
        }

    }

    useEffect(() => { //reset message after send
        clear()
    }, [Chat])


    const imageMsg = () => {

        time = currentTime()

        if (!imgUrl == "") {
            var msg = {
                from: true,
                time: time,
                data: <img src={imgUrl} />,
                type: "image"
            }
            //members[i].chat[Index].push(msg)
            alert("Image messages are not supported this time(was at previous project , i just save the logic for next time)")
            clear()
            //setChat(!Chat)
        }
        else {
            setErrorMessage("Please choose an image")
        }

    }
    const videomsg = function () {

        time = currentTime()

        if (!vidUrl == "") {
            var msg = {
                from: true,
                time: time,
                data: <video controls >
                    <source src={vidUrl}></source>
                </video>,
                type: "video"
            }
            //members[i].chat[Index].push(msg)
            alert("Video messages are not supported this time(was at previous project , i just save the logic for next time)")
            clear()
            //setChat(!Chat)
        }
        else {
            setErrorMessage("Please choose a video")
        }

    }
  

    const clickCounter = useRef(0)

    function startRecording() {
        if (clickCounter.current % 2 == 0) {//first click
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    const audioChunks = []
                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        setAudUrl(audioUrl);
                        stream.getTracks().forEach(track => track.stop());//stop record on browser
                    });

                });
        }
        if (clickCounter.current % 2 == 1) {//second click
            mediaRecorder.stop();
        }
        clickCounter.current = clickCounter.current + 1
        console.log(audUrl)
    }
    const audioMsg = function () {

        time = currentTime()

        if (!audUrl == "") {
            var msg = {
                from: true,
                time: time,
                data: <audio controls >
                    <source src={audUrl}></source>
                </audio>,
                type: "audio"
            }
            //members[i].chat[Index].push(msg)
            alert("Audio messages are not supported this time(was at previous project , i just save the logic for next time)")
            clear()
            //setChat(!Chat)
        }
        else {
            if(clickCounter.current%2==0&& audUrl==""){ //handle aud error mesg
                setErrorAudMessage("Please record")
            }
            if(clickCounter.current%2==1&& audUrl==""){ //handle aud error mesg
                setErrorAudMessage("Please finish  recording")
            }
            
        }
    }
    useEffect(()=>{//clear the error message when stop recording
            setErrorAudMessage("")
    },[audUrl])


    if (Index == -1) {
        return (
            <div className="chat-message clearfix">
                <div className="input-group mb-0">
                    <div className="input-group-prepend">
                    </div>
                </div>
                <div className="col-lg-6 hidden-sm text-right">
                </div>
            </div>
        )
    }
    return (
        <div>

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
                    <button className='btn btn-outline-secondary' data-toggle="modal"
                        data-target="#audioUpload"
                       
                        type="button"><i className="fa fa-microphone" aria-hidden="true" ></i></button>
                    <button
                        type="button"
                        className="btn btn-outline-info"
                        data-toggle="modal"
                        data-target="#imageUpload"
                       
                    >
                        <i className="fa fa-picture-o" aria-hidden="true" ></i>
                    </button>
                    <button
                        className="btn btn-outline-info"
                        type="button" data-toggle="modal"
                        data-target="#videoUpload"
                    
                    >
                        <i className="fa fa-video-camera" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

            <div
                className="modal fade"
                id="imageUpload"
                data-backdrop="static"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Upload image
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={clear}
                            />
                        </div>
                        <div className="modal-body">
                            <input type="file" accept="image/*" className="form-control" id="imageInput" onChange={handleImgChange} />
                            {errorMessage && (<p className="error">{errorMessage}</p>)}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={clear}
                            >
                                Close
                            </button>
                            {(imgUrl == "") && <button type="button" className="btn btn-primary" onClick={imageMsg}>
                                Send
                            </button>}
                            {(imgUrl != "") && <button type="button" className="btn btn-primary" onClick={imageMsg} data-dismiss="modal">
                                Send
                            </button>}

                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="videoUpload"
                data-backdrop="static"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Upload video
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={clear}
                            />
                        </div>
                        <div className="modal-body">
                            <input type="file" accept="video/*" className="form-control" id="videoInput" onChange={handleVidChange} />
                            {errorMessage && (<p className="error">{errorMessage}</p>)}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={clear}
                            >
                                Close
                            </button>
                            {(vidUrl == "") && <button type="button" className="btn btn-primary" onClick={videomsg}>
                                Send
                            </button>}
                            {(vidUrl != "") && <button type="button" className="btn btn-primary" onClick={videomsg} data-dismiss="modal">
                                Send
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="audioUpload"
                data-backdrop="static"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Upload Audio
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={clear}
                            />

                        </div>
                        <div className="modal-body">
                            <button onClick={startRecording} >Record</button>
                            {errorAudMessage && (<p className="error">{errorAudMessage}</p>)}
                        </div>
                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={clear}
                            >   Close
                            </button>
                            {(audUrl == "") && <button type="button" className="btn btn-primary" onClick={audioMsg}>
                                Send
                            </button>}
                            {(audUrl != "") && <button type="button" className="btn btn-primary" onClick={audioMsg} data-dismiss="modal">
                                Send
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default ChatActions