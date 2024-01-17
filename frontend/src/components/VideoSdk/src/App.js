import { MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import { useState } from "react";
import { MeetingAppProvider } from "./MeetingAppContextDef";
import { MeetingContainer } from "./meeting/MeetingContainer";
import { LeaveScreen } from "./components/screens/LeaveScreen";
import { JoiningScreen } from "./components/screens/JoiningScreen";
import { useSocket } from "../../Context/SocketProvider";
import { useNavigate } from "react-router-dom";
function App() {


  
  
  const navigate = useNavigate()
  const socket = useSocket()
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(
    selectedWebcam.id
  );
  const [userDetails, setUserDetails] = useState(false);
  const [iAmHost, setIAmHost]= useState(false)
  const [host, setHost]= useState("")
  const [roomId, setRoomId]= useState("")
  const [roomMembers, setRoomMembers]= useState([])
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);
  const [onWaitingList, setOnWaitingList] = useState(false);
  const [modalWaitingList, setModalWaitingList] = useState(false);
  const [disconnecting, setDisconnectiong] = useState(false);
  const [checked, setChecked]= useState([])
  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
    ).matches;
    
    const globalUrl = process.env.REACT_APP_GLOBAL_URL;
    
    // useEffect(() => {
      //   if (isMobile) {
  //     window.onbeforeunload = () => {
  //       return "Are you sure you want to exit?";
  //     };
  //   }
  // }, [isMobile]);
  const screenShare = ()=>{
    // if (roomMembers.find((user)=>{return user.isSharingScreen===true})) {
    //   // socket.emit("screenshare:off",{roomId})      
    // } else {
    //   socket.emit("screen:share",{roomId})
    // }
  }
  const forceStopScreenShare = () =>{
   const activeSharing = roomMembers.find((user)=>user.isSharingScreen===true)
   if (activeSharing) {
    socket.emit('force:stop:screenshare', {socketId: activeSharing.socketId})
   }
  }
  const approvedJoin = ()=>{
    const updatedMembers = roomMembers.map((member)=>{
      if (checked.includes(member?.socketId)) {
          return {
            ...member,
            status: "approved",
          };
      } else {return member}
    })
    socket.emit("conference:status",{roomId, roomMembers:updatedMembers})
  }
  const declineJoin = ()=>{
    const updatedMembers = roomMembers.map((member)=>{
      if (checked.includes(member?.socketId)) {
          return {
            ...member,
            status: "declined",
          };
      } else {return member}
    })
    socket.emit("conference:status",{roomId, roomMembers:updatedMembers})
  }
  const updateWaitingList = async (data)=>{
    const {roomId,roomMembers}= data
    setRoomId(roomId)
    const roomHost = await data.roomMembers?.find((member)=>member.status==="host")
    setHost(roomHost?.userName)
    setRoomMembers(roomMembers)
   
   
  }
//  const {toggleScreenShare} = useMeeting()
  useEffect(() => {
    socket.on("update:list", updateWaitingList);
    
    
    socket.on("host:disconnected", ()=>{   
      setDisconnectiong(true)
      setTimeout(()=>{
        // window.location.reload()
        navigate("/")
      },5000)
    });
    // socket.on("update:list", handleUserJoined);

    return () => {
      socket.off("update:list", updateWaitingList);
      
      socket.off("host:disconnected", ()=>{   
        setDisconnectiong(true)  
        setTimeout(()=>{
          // window.location.reload()
          navigate("/")
        },2000)
        setTimeout(()=>{
          alert(`The host has ended the call or has been disconnected.`)
        },2001)
      });
    };
  }, [
    socket,
  ]);
  
  let user = localStorage.getItem("user");
  
  const fetchData = async () => {
    const url = `${globalUrl}/useraccounts/retrieve/` + user;
    const method = "GET";
    const header = {
      "Content-Type": "application/json",
      "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
    };
    try {
      const response = await fetch(url, {
        method,
        headers: header,
      });
      const data = await response.json();
      setUserDetails(data)
      setParticipantName(data?.fullname)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  

  return (
    <>    
    {disconnecting && 
      <>
      <div className="inset-0 fixed backdrop-blur-xl flex justify-center items-center"  style={{zIndex:214748367}}>
        <div className="min-w-[200px] w-[40vw] h-[30vh] rounded-2xl bg-gray-900 mx-auto flex flex-col justify-center items-center p-3">
          <div className="text-white text-center">The meeting has ended or host has been disconnected. Ending the meeting in 5 (Five) seconds</div>
        </div>
      </div>
      </>
    }
    {!modalWaitingList && (onWaitingList || iAmHost) && <>
      <div  className="fixed top-5 right-5 backdrop-blur-xl z-50 bg-gray-800 text-white border border-gray-300 p-3 rounded-2xl hover:text-gray-800 hover:bg-gray-300 hover:cursor-pointer"  style={{zIndex:214748364}} onClick={()=>setModalWaitingList(true)}><i className="fa-solid fa-users-line text-xl"></i></div>
    </>}

    {modalWaitingList &&
    <div className="inset-0 fixed backdrop-blur-xl z-50 flex justify-center items-center"  style={{zIndex:214748364}}>
      <div className="min-w-[370px] w-[70vw] h-[80vh] rounded-2xl bg-gray-900 mx-auto flex flex-col">
        <div className="w-full h-[7%] p-2 flex justify-end items-center"><i onClick={()=>setModalWaitingList(false)} className="fa-solid fa-close p-3 text-xl hover:cursor-pointer text-white"></i></div>
        <div className="w-full h-[80%] p-3 flex flex-col justify-start items-center text-white overflow-y-auto overflow-x-clip">
          <div className="w-full flex flex-col items-center px-3">
          <h3 className="text-center text-xl font-semibold">Host: {host?host:"Disconnected"}</h3>
          <h3 className="text-center text-xl font-semibold">Meeting Id: {roomId?roomId:meetingId?meetingId:"Loading"}</h3>
          </div>
          <div className="w-full flex flex-col items-center px-3 mx-3 border border-gray-400 rounded-xl mt-3">
          <h3 className="text-center text-xl">Waiting Lists:</h3>
          {/* QUEUEING */}
          <ul className="flex flex-wrap gap-2 py-3">
            {roomMembers?.map((member,index)=>{
              if (member?.status==="queueing") {
              return <li key={index} className={`${checked.includes(member.socketId)?"border-green": "border-gray-500"} border px-2 py-1 rounded-lg hover:border-green hover:text-lime-100 font-semibold hover:cursor-pointer`} onClick={()=>{
                if (iAmHost) {
                  
                  if (!checked.includes(member.socketId)) {
                    setChecked([...checked, member?.socketId])
                  } else {
                    setChecked(checked.filter((user)=>{return user!==member.socketId}))
                  }
                }
              }}>{member.userName}</li>
                             
              }
            })}
            
          </ul>
          </div>
          <div className="w-full flex flex-col items-center px-3 mx-3 border border-gray-400 rounded-xl mt-8">
          <h3 className="text-center text-xl">Participants in the room:</h3>
          {/* QUEUEING */}
          <ul className="flex flex-wrap gap-2 py-3">
          {roomMembers?.map((member,index)=>{
              if (member?.status==="approved") {
              return <li key={index} className="border-gray-700 border px-2 py-1 rounded-lg font-semibold">{member?.userName}</li>
                             
              }
            })}
            
          </ul>
          </div>
        
        </div>
        <div className="w-full h-[13%] p-3 flex justify-between items-center gap-3">
          {iAmHost && roomMembers?.filter((el)=> {return el.status !== "host"}).filter((el)=> {return el.status === "queueing"}).length !==0 && <>
          {roomMembers.find((user)=>user.isSharingScreen===true) ?
          <div className="px-3 py-2 my-2 bg-red-800 rounded-xl justify-self-start text-white font-semibold text-center text-lg hover:cursor-pointer hover:bg-red-900" onClick={forceStopScreenShare}>Stop Screenshare</div> : <div></div>
          }
          <div className="flex h-full gap-3 mb-3 justify-center items-center">

          <div className="px-3 py-2 my-2 bg-red-800 rounded-xl text-white font-semibold text-center text-lg hover:cursor-pointer hover:bg-red-900" onClick={declineJoin}>Decline <i className="fa-solid fa-close"></i></div>
          <div className="px-3 py-2 my-2 bg-lime-600 rounded-xl text-white font-semibold text-center text-lg hover:cursor-pointer hover:bg-lime-700" onClick={approvedJoin}>Approve <i className="fa-solid fa-check"></i></div>
          </div>
          </>}
        </div>
        </div>
      </div>}
      {isMeetingStarted ? (
        <MeetingAppProvider
          selectedMic={selectedMic}
          selectedWebcam={selectedWebcam}
          initialMicOn={micOn}
          initialWebcamOn={webcamOn}
        >
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : "TestUser",
              

              multiStream: true,
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setToken("");
                setMeetingId("");
                // setParticipantName("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              socket={socket}
              iAmHost={iAmHost}
              setIsMeetingLeft={setIsMeetingLeft}
              selectedMic={selectedMic}
              selectedWebcam={selectedWebcam}
              selectWebcamDeviceId={selectWebcamDeviceId}
              setSelectWebcamDeviceId={setSelectWebcamDeviceId}
              selectMicDeviceId={selectMicDeviceId}
              setSelectMicDeviceId={setSelectMicDeviceId}
              micEnabled={micOn}
              webcamEnabled={webcamOn}
              screenShare={screenShare}
              roomMembers={roomMembers}
              roomId={roomId}
            />
          </MeetingProvider>
        </MeetingAppProvider>
      ) : isMeetingLeft ? (
        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
      ) : (
        <JoiningScreen
          participantName={participantName}
          // setParticipantName={setParticipantName}
          setModalWaitingList={setModalWaitingList}
          onWaitingList={onWaitingList}
          setOnWaitingList={setOnWaitingList}
          setIAmHost= {setIAmHost}
          iAmHost={iAmHost}
          userDetails={userDetails}
          setMeetingId={setMeetingId}
          setToken={setToken}
          setMicOn={setMicOn}
          micEnabled={micOn}
          socket = {socket}
          webcamEnabled={webcamOn}
          setSelectedMic={setSelectedMic}
          setSelectedWebcam={setSelectedWebcam}
          setWebcamOn={setWebcamOn}
          onClickStartMeeting={() => {
            setMeetingStarted(true);
          }}
          startMeeting={isMeetingStarted}
          setIsMeetingLeft={setIsMeetingLeft}
        />
      )}
    </>
  );
}

export default App;
