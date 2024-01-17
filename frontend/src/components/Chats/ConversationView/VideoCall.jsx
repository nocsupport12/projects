import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import { useSocket } from "../../Context/SocketProvider";
import Logo from "../../../assets/User.png";
import { useNavigate } from "react-router-dom";

export const VideoCall = ({ callType, setCallType,imCalling,setImCalling }) => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [join, setJoin] = useState(false);
  const [camera, setCamera] = useState(false);
  const [mic, setMic] = useState(false);
  const [remoteCamera, setRemoteCamera] = useState(true);
  const [remoteAudio, setRemoteAudio] = useState(true);
  const [callIgnored, setCallIgnored] = useState(false);
  let remoteSocketIdForce = "";

  //VIDEO TOGGLE
  const handleCamera = () => {
    
    setCamera(!camera);
    if (!camera) {
      removeVideoTrack();
    } else {
      addVideoTrack();
      setCallType("Video");
    }
  };
  //AUDIO TOGGLE
  const handleMic = () => {
    setMic(!mic);
    if (!mic) {
      removeAudioTrack();
    } else {
      addAudioTrack();
    }
  };

  const handleUserJoined = useCallback(
    ({ room, id }) => {
      setRemoteSocketId(id);
    },
    [socket]
  );

  const handleCallUser = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer, socketId }) => {
      remoteSocketIdForce = from;
      setRemoteSocketId(from);
     
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    if (callType === "Audio") {
      removeVideoTrack();
      setRemoteCamera(false);
      setCamera(!camera);
    }
    setImCalling(false)
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans, socketId }) => {
      remoteSocketIdForce = from;
      setRemoteSocketId(from);
      peer.setLocalDescription(ans);
      
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
     
      setRemoteStream(remoteStream[0]);
    });
    const initializeStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
    };
    initializeStream();
  }, []);

  useEffect(() => {
    socket.on("call:ignored", (data)=>{
      
      if(data.status==="ignored"){
        setCallIgnored(true)
        setTimeout(()=>{
          window.location.reload(false)
        },3000)
    }})
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("camera:toggle", handleCameraToggle);
    socket.on("audio:toggle", handleAudioToggle);
    socket.on("user:disconnect", handleUserDisconnected);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("camera:toggle", handleCameraToggle);
      socket.off("audio:toggle", handleAudioToggle);
      socket.off("user:disconnect", handleUserDisconnected);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  useEffect(() => {
    const timeOut = setTimeout(()=> {  
      if(!remoteSocketId){
        window.location.reload(false)
      }
    } , 15000)

    return (() => {
      clearTimeout(timeOut)
    })
  }, [remoteSocketId])
  //VIDEO TOGGLING ENABLE/DISABLE
  const disableVideoTrack = () => {
    if (myStream) {
      const videoTracks = myStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = false; // Disable the video track
      });
    }
  };

  const enableVideoTrack = () => {
    if (myStream) {
      const videoTracks = myStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = true; // Enable the video track
      });
    }
  };
  const removeVideoTrack = () => {
    disableVideoTrack();
    //SIGNALLING ON SOCKET FOR UPDATE TO RECEIPIENT
    socket.emit("camera:toggle", {
      camera: false,
      to: remoteSocketId,
    });

    //LOCAL STREAM STOPPING
    const peerConnection = peer.peer;
    const senders = peerConnection.getSenders();
    if (senders.length > 0) {
      for (const s of senders) {
        if (s.track?.kind === "video") {
          s.track.enabled = false;
        }
      }
    }
  };
  const addVideoTrack = async () => {
    //ENABLE LOCAL STREAM
    enableVideoTrack();
    try {
      const peerConnection = peer.peer;
      const senders = peerConnection.getSenders();
      if (senders.length > 0) {
        for (const s of senders) {
          if (s.track?.kind === "video") {
            s.track.enabled = true;
          }
        }
      }
      //SIGNALLING OF CAMERA ENABLED
      socket.emit("camera:toggle", {
        camera: true,
        to: remoteSocketId,
      });
    } catch (error) {
      console.error("Error adding video track:", error);
    }
  };
  const handleCameraToggle = ({ camera, from }) => {
    if (camera) {
      setRemoteCamera(true);
    } else {
      setRemoteCamera(false);
    }
  };

  const disableAudioTrack = () => {
    if (myStream) {
      const audioTracks = myStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = false; // Disable the audio track
      });
    }
  };

  const enableAudioTrack = () => {
    if (myStream) {
      const audioTracks = myStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = true; // Enable the audio track
      });
    }
  };

  const removeAudioTrack = () => {
    disableAudioTrack();
    // Signalling on socket for update to recipient
    socket.emit("audio:toggle", {
      audio: false,
      to: remoteSocketId,
    });

    // Local stream stopping
    const peerConnection = peer.peer;
    const senders = peerConnection.getSenders();
    if (senders.length > 0) {
      for (const s of senders) {
        if (s.track?.kind === "audio") {
          s.track.enabled = false;
        }
      }
    }
  };

  const addAudioTrack = async () => {
    // Enable local stream audio
    enableAudioTrack();
    try {
      const peerConnection = peer.peer;
      const senders = peerConnection.getSenders();
      if (senders.length > 0) {
        for (const s of senders) {
          if (s.track?.kind === "audio") {
            s.track.enabled = true;
          }
        }
      }
      // Signalling of audio enabled
      socket.emit("audio:toggle", {
        audio: true,
        to: remoteSocketId,
      });
    } catch (error) {
      console.error("Error adding audio track:", error);
    }
  };

  const handleAudioToggle = ({ audio, from }) => {
    if (audio) {
      setRemoteAudio(true);
    } else {
      setRemoteAudio(false);
    }
  };
  //DISCONNECT OR END CALL
  const handleUserDisconnected = ({ user }) => {
    
    if (user === remoteSocketIdForce) {
      alert(
        `${user} has been disconnected. Returning to chat page in a moment`
      );
      setTimeout(() => {
        navigate("/chatspage");
        window.location.reload(false);
      }, 2000);
    }
  };

  return (
    <section>

    {callIgnored &&
    <div className="inset-0 fixed flex justify-center items-center bg-slate-600" style={{zIndex:123123123}}>
     <p className="text-center text-white text-3xl font-bold">
     Call Ignored by User
     </p> 
    </div>
    }
      <div>
        
        {remoteSocketId && !join && (
          <button
            onClick={() => {
              handleCallUser();
              setJoin(true);
            }}
            className="fixed inset-0 z-50"
          >
            <span className="px-3 py-4 bg-lime-700 text-white hover:font-bolder hover:bg-lime-900 ">
              Join Call
            </span>
          </button>
        )}
        <>
          <div className="relative bg-gray-350">
            {myStream && !camera && callType === "Video" && (
              <div className="absolute p-14 z-20">
                {/* display for yourself */}
                <ReactPlayer
                  playing
                  muted
                  height="20vh"
                  width="20vw"
                  url={myStream}
                />
              </div>
            )}

            <div className="w-screen h-screen  flex flex-col justify-center items-center">
              {remoteStream && (
                <div>
                  {remoteStream && (
                    <div
                      style={{
                        position: "relative",
                        width: "70vw",
                        height: "70vh",
                        backgroundColor: "black",
                      }}
                    >
                      {/* Image overlay with darker effect */}
                      <img
                        src={Logo} // Replace with your image URL
                        alt="Overlay"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: 0.3,
                          // Apply semi-transparent black background
                          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here (0.5 for 50% opacity)
                        }}
                      />
                      {/* ReactPlayer */}
                      <div className="relative">
                        <ReactPlayer
                          playing
                          height="70vh"
                          width="70vw"
                          url={remoteStream}
                        />
                        <div className="absolute bottom-0 right-0 gap-2 flex">
                          {!remoteAudio && (
                            <span className="rounded-xl text-[22px] px-3 py-3 text-gray-300 border border-gray-500 flex items-center justify-center">
                              <i className="fa-solid fa-microphone-slash"></i>
                            </span>
                          )}
                          {!remoteCamera && (
                            <span className="rounded-xl text-[22px] px-3 py-3 text-gray-300 border border-gray-500 flex items-center justify-center">
                              <i className="fa-solid fa-video-slash"></i>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {remoteSocketId && !imCalling? (
                <div className="text-[2rem] pt-10 flex gap-5">
                  {/* camera on and camera off */}
                  <div onClick={handleCamera}>
                    {!camera ? (
                      <span className="rounded-xl text-[22px] px-3 py-3 text-white border hover:cursor-pointer  flex items-center justify-center">
                        <i className="fa-solid fa-video"></i>
                      </span>
                    ) : (
                      <span className="rounded-xl text-[22px] px-3 py-3 text-white border hover:cursor-pointer flex items-center justify-center">
                        <i className="fa-solid fa-video-slash"></i>
                      </span>
                    )}
                  </div>
                  
                  {/* END CALL/CANCEL CALL */}
                  <span
                    className="rounded-xl text-[22px] px-3 py-3 text-white border hover:cursor-pointer flex items-center justify-center"
                    onClick={() => {
                      navigate("/chatspage");
                      window.location.reload(false);
                    }}
                  >
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  {/* mic on and mic off */}
                  <div onClick={handleMic}>
                    {!mic ? (
                      <span className="rounded-xl text-[22px] px-3 py-3 text-white border hover:cursor-pointer flex items-center justify-center">
                        <i className="fa-solid fa-microphone"></i>
                      </span>
                    ) : (
                      <span className="rounded-xl text-[22px] px-3 py-3 text-white border hover:cursor-pointer flex items-center justify-center">
                        <i className="fa-solid fa-microphone-slash"></i>
                      </span>
                    )}
                  </div>
                </div>

              ) : (
                <>
                {!remoteSocketId &&
                <div className="flex flex-col justify-center items-center h-screen w-full text-3xl text-white font-bold">
                
                 <p>{imCalling?"Calling...":"Waiting for the caller to join..."}</p>
                  {/* END CALL/CANCEL CALL */}
                    <span
                      className="rounded-xl text-[22px] px-3 py-3 mt-10 text-white bg-red-600 border hover:cursor-pointer flex items-center justify-center justify-self-end"
                      onClick={() => {
                        navigate("/chatspage");
                        window.location.reload(false);
                      }}
                    >
                      <i className="fa-solid fa-phone"></i>
                    </span>
                </div>
                }
                </>
                
                
                
                
                )}
              
            </div>
          </div>
        </>
      </div>
    </section>
  );
};
