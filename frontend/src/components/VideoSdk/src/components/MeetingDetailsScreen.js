import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function MeetingDetailsScreen({
  socket,
  setModalWaitingList,
  onWaitingList, setOnWaitingList,
  setIAmHost,
  iAmHost,
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  userDetails,
  // setParticipantName,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
}) {
  const navigate = useNavigate()
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);
  const [user, setUser] = useState(false);
  const [entering, setEntering] = useState(false);
  useEffect(()=>{
    setUser(userDetails)
  },[userDetails])
  useEffect(() => {
    socket.on("join:status",  (data)=>{
      if (data.status==="approved") {
        setModalWaitingList(false)
        setEntering(true)
        setTimeout(() => {
          onClickJoin(data?.roomId)
        }, 5000);
      } else if (data.status==="declined"){
        setTimeout(()=>{
          navigate("/")
          alert("You have been declined by the host.")
          setModalWaitingList(false)
          
        }, 1000)
      }
    });

    return () => {
      socket.off("join:status",  (data)=>{
        if (data.status==="approved") {
          setModalWaitingList(false)
          setEntering(true)
          setTimeout(() => {
            onClickJoin(data?.roomId)
          }, 5000);
        } else if (data.status==="declined"){
          setTimeout(()=>{
            navigate("/")
            alert("You have been declined by the host.")
            setModalWaitingList(false)
            
          }, 1000)
        }
      });
    };
  }, [
    socket,
  ]);


  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {entering && 
      <>
      <div className="inset-0 fixed backdrop-blur-xl flex justify-center items-center"  style={{zIndex:214748367}}>
        <div className="min-w-[200px] w-[40vw] h-[30vh] rounded-2xl bg-gray-900 mx-auto flex flex-col justify-center items-center p-3">
          <div className="text-white text-center">You have been granted permission to enter the room. Entering the meeting in 5 (Five) seconds</div>
        </div>
      </div>
      </>
    }
      {iscreateMeetingClicked && user?.level!=="1" ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center">
          <p className="text-white text-base">
            {`Meeting code : ${meetingId}`}
          </p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingId);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        !onWaitingList?
        <>
          <input
            defaultValue={meetingId}
            onChange={(e) => {
              setMeetingId(e.target.value!==""?e.target.value?.trim().split(/[-_ ]/). join("").match(/.{1,4}/g).join('-'):"");
            }}
            placeholder={"Enter meeting Id"}
            className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          {meetingIdError && (
            <p className="text-xs text-red-600">{`Please enter valid meetingId`}</p>
          )}
        </>:<div className="text-white text-center bg-gray-900 py-2 rounded-3xl mb-3">Meeting room : {meetingId}</div>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          {/* <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-white w-full text-center"
          /> */}

          {/* <p className="text-xs text-white mt-1 text-center">
            Your name will help everyone identify you in the meeting.
          </p> */}
          {!onWaitingList &&
          
          <button
            disabled={participantName.length < 3}
            className={`w-full ${
              participantName.length < 3 ? "bg-gray-650" : "bg-purple-350"
            }  text-white px-2 py-3 rounded-xl mt-5`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                if (videoTrack) {
                  videoTrack.stop();
                  setVideoTrack(null);
                }
                onClickStartMeeting();
               
              } else {
                if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  if (iAmHost) {
                    onClickJoin(meetingId);
                                      } else {
                                        setOnWaitingList(true)
                                        socket.emit("conference:join", {userName:userDetails?.fullname, roomId:meetingId})
                                      }
                } else setMeetingIdError(true);
              }
            }}
          >
            {iscreateMeetingClicked ?  "Enter meeting": "Join a meeting"}
          </button>}
          {onWaitingList && <div className="text-white text-center">Waiting to be approved by the host...</div>}
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full ">
            {user && <>
             {user?.level!== "1" && (<button
              className="w-full bg-purple-350 text-white px-2 py-3 rounded-xl"
              onClick={async (e) => {
                if (user?.level!=="1"){
                const meetingId = await _handleOnCreateMeeting();
                setMeetingId(meetingId);
                setIscreateMeetingClicked(true);
                setIAmHost(true)
                socket.emit("conference:create",{roomId:meetingId, userName:userDetails?.fullname})
                }
              }}
            >
              Create a meeting
            </button>)}</>}

            <button
              className="w-full bg-gray-650 text-white px-2 py-3 rounded-xl mt-5"
              onClick={(e) => {
                setIsJoinMeetingClicked(true);
              }}
            >
              Join a meeting
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
