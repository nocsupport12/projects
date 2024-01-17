const PORT = 8800

const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
  },
  // secure: true, 
});

const userToSocketIdMap = new Map();
const socketidToUserMap = new Map();
const conferenceRooms = new Map();
let activeUsers = [];


io.on("connection", (socket) => {
    // ///////////CHATS/////////////////////////////////////////////////////
  socket.on("new-user-add", (newUserId) => {
      // adding user to activeusers
    if (activeUsers.filter((el)=>{return el.socketId===socket.id}).length<1) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });      
      // send all active users to the new user
      io.emit("get-users", activeUsers);
    }
      io.to(socket.id).emit("get-users", activeUsers);
  });

  
  // send a message to multiple users
  socket.on("send-message", (data) => {
    const { receivers } = data;
    
    // Iterate through the array of receivers and emit the message to each user
    receivers.forEach((receiver) => {
      const users = activeUsers.filter((user) => {return (user.userId === receiver)});
      if (users) {
        // SEND TO ALL ACTIVE SESSIONS OF USERS
        users.forEach((user)=>{
          io.to(user.socketId).emit("receive-message", data);
        })
      }
    });
  });
  // DELETE MESSAGE FOR EVERYONE
  socket.on('delete-message',(data=>{
    const {receivers} = data
     // Iterate through the array of receivers and emit the message to each user
     receivers.forEach((receiver) => {
      const users = activeUsers.filter((user) => {return (user.userId === receiver)});
      if (users) {
        // SEND TO ALL ACTIVE SESSIONS OF USERS
        users.forEach((user)=>{
          io.to(user.socketId).emit("receive-message-delete", data);
        })
      }
      io.to(socket.id).emit("receive-message-delete", data);
    });
  }))

  // NEW CHAT CREATED
  socket.on('new:chat', (data=>{
    const {members} = data.data
    members.forEach((member)=>{
      const users = activeUsers.filter((user) => {return (user.userId === member)});
      if (users) {
        // SEND TO ALL ACTIVE SESSIONS OF USERS
        users.forEach((user)=>{
          io.to(user.socketId).emit('new:chat:created', data.data)
        })        
      }
    })
  }))

  // ///////////VIDEOCALL///////////////////////////////////////////////////
  
  
  ////////////////////////////////////////////////////////////
  socket.on("send:call",(data)=>{
    const {receivers, userId, chatId, callType} = data;
    const caller= activeUsers.find((user) => user.userId === userId);
    receivers.forEach((receiver) => {
      const users = activeUsers.filter((user) => user.userId === receiver);
      //SENDING CALL TO RECEIVER
      if (users) {
        users.forEach((user)=>{
          io.to(user.socketId).emit("receive:call", {...data, socketId:socket.id});
          io.to(socket.id).emit("call:progress", {socketId: user.socketId});
          
        })
      } else {
        io.to(caller.socketId).emit("call:fail", `${receiver} not online`);
      }
      
    });
    
  })
  socket.on("ignore:call",(data)=>{
    // console.log(data);
    // const {socketId}=data
    io.to(data.data).emit('call:ignored',{status:"ignored"})
  })
  //VIDEOCALL ROOM JOIN
  socket.on("room:join", (data) => {
    const { userId, room } = data;
    userToSocketIdMap.set(userId, socket.id);
    socketidToUserMap.set(socket.id, userId);
    io.to(room).emit("user:joined", { room, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });
  //JOIN CALL CLICKED //RECEIVE OFFER FROM CALLER
  socket.on("user:call", ({ to, offer , }) => {
    //SEND OFFER TO RECEIPIENT
    io.to(to).emit("incomming:call", { from: socket.id, offer, socketId:socket.id });
  });
  // JOIN CALL CLICKED //RECEIVE ANSWER FROM RECEIPIENT
  socket.on("call:accepted", ({ to, ans }) => {
    //SEND ANSWER TO CALLER
    io.to(to).emit("call:accepted", { from: socket.id, ans,  socketId:socket.id  });
  });
  //ADDITIONAL PERMISSIONS IF NEEDED// OFFER
  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
  //ADDITIONAL PERMISSIONS IF NEEDED// ANSWER
  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
  //CAMERA OFF/ON
  socket.on("camera:toggle", ({camera,  to})=>{
    socket.to(to).emit("camera:toggle", {camera, from:(activeUsers.find(()=>(user) => user.socketId === to))})
  });
  //AUDIO OFF/ON
  socket.on("audio:toggle", ({audio,  to})=>{
    socket.to(to).emit("audio:toggle", {audio, from:(activeUsers.find(()=>(user) => user.socketId === to))})
  });
  //DISCONNECTED USERS
  socket.on("disconnect", () => {
    // remove the user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    //UPDATE ESPECIALLY FOR CALL
    activeUsers.forEach((user)=>{
      io.to(user.socketId).emit('user:disconnect',{user: socket.id})
      io.emit('get-users',{user: socket.id})
    })

    //CONFERENCE
    // Handle disconnection for conference call users
    conferenceRooms.forEach((roomMembers, roomId) => {
      let hostDisconnected = false;
      const updatedRoomMembers = roomMembers.filter(
        (member) => member.socketId !== socket.id
        );
    
    // Check if the disconnected user was the host in this room
    const hostIndex = roomMembers.findIndex(
      (member) => member.socketId === socket.id && member.status === 'host'
    );
    if (hostIndex !== -1) {
      hostDisconnected = true;
    }

    conferenceRooms.set(roomId, updatedRoomMembers);

    // Emit an update to the room members for each affected room
    if (hostDisconnected) {
      io.to(roomId).emit("host:disconnected");
    } else {
      io.to(roomId).emit("update:list", { roomId, roomMembers: updatedRoomMembers });      
    }
  });

  // If the host disconnected, notify all room members

    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  //CONFERENCE CALL 
  // HOST CREATE A ROOM
socket.on("conference:create", (data) => {
  const { roomId, userName } = data;
  // Join socket room
  socket.join(roomId);

  // Create array of objects with roomId identifier
  const roomMembers = [{ userName:userName, socketId: socket.id, status: 'host', isSharingScreen: false, }];
  conferenceRooms.set(roomId, roomMembers);

  socket.emit('conference:created', roomId);
  socket.emit("update:list", { roomId, roomMembers})
});

  //JOIN ROOM WITH SPECIFIC MEETING ID
  socket.on("conference:join",(data)=>{
    const {roomId, userName} = data
   //join socket room
   socket.join(roomId);
    //update room with own data created with a status of queueing
    const roomMembers = conferenceRooms.get(roomId) || [];
    roomMembers.push({ userName: userName, socketId:socket.id , status: 'queueing', isSharingScreen: false, });
    conferenceRooms.set(roomId, roomMembers);
    io.to(roomId).emit("update:list", { roomId, roomMembers})
    socket.emit("update:list", { roomId, roomMembers})
  })  

  //APPROVE PARTICIPANT BY HOST
  socket.on("conference:status",(data)=>{
    const {roomId, roomMembers} = data
    conferenceRooms.set(roomId, roomMembers)
    //approve the use in socket room by updating the status to approved
    roomMembers.forEach((member)=>{
      if (member?.status!=='queueing') {
        io.to(member.socketId).emit("join:status",{roomId,status: member?.status})
      } 
    })
    io.to(roomId).emit("update:list", { roomId, roomMembers})
    socket.emit("update:list", { roomId, roomMembers})
  })

  //SHARING SCREEN
  socket.on("screen:share", (data)=>{
    const {roomId } = data
   let roomMembers = conferenceRooms.get(roomId) || [];
    let updatedRoomMembers =[]
    const sharingActive = roomMembers.find((user)=> user.isSharingScreen===true)
    if (!sharingActive) {
      roomMembers.map((user)=>{
        let updatedUser;
        if (user.socketId===socket.id) {
         updatedUser = {...user, isSharingScreen:true}
        } else {
         updatedUser = user
        }
        updatedRoomMembers.push(updatedUser)
      })
      roomMembers = updatedRoomMembers
    
      conferenceRooms.set(roomId,roomMembers)
      socket.to(roomId).emit("update:list", {roomId,roomMembers})
      socket.emit("update:list", {roomId,roomMembers})
    }

  }
  )

  socket.on("screenshare:off", (data)=>{
    const {roomId } = data
    let roomMembers = conferenceRooms.get(roomId) || [];
    let updatedRoomMembers =[]
    const sharingActive = roomMembers.find((user)=> user.isSharingScreen===true)
    if (sharingActive && sharingActive.socketId===socket.id) {
      roomMembers.map((user)=>{
        let updatedUser;
        if (user.socketId===socket.id) {
         updatedUser = {...user, isSharingScreen:false}
        } else {
          updatedUser = user
        }
        updatedRoomMembers.push(updatedUser)
      })
      roomMembers = updatedRoomMembers
    
      conferenceRooms.set(roomId,roomMembers)
      socket.to(roomId).emit("update:list", {roomId,roomMembers})
      socket.emit("update:list", {roomId,roomMembers})
    }

  })

  socket.on("force:stop:screenshare",data=>{
    const {socketId} = data
    io.to(socketId).emit("force:stop:screenshare",socketId)
  })
  
 
  
  
});
