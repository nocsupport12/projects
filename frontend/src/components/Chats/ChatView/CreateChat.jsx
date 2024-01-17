// IMPORT CSS
import  "./createchat.css"

export const CreateChat = ({setCreateChatUsers, createChatUsers, createChatDB}) => {
  return (
    
    <div className="inset-0 fixed backdrop-blur-xl flex justify-center items-center" style={{ zIndex: 10000000 }}>
        <div className="bg-gray-200 shadow-2xl min-w-[350px] w-[40vw] h-[70vh] rounded-2xl flex flex-col items-center  py-1">

            {/* CLOSE BUTTON */}
            <div className="flex justify-end pr-3 h-[5%] w-full">
                <i onClick={() => setCreateChatUsers(null)}
                    className="fa-icon fa-solid fa-close text-2xl hover:cursor-pointer text-gray-500 hover:text-black">   
                </i>
            </div>

            
            <div className="w-full flex flex-col h-[85%]">
                <div id="create-chat" className=' border-b border-gray-300  shadow-md h-[20%] overflow-x-auto'>  
                
                    {/* USERS ADDED */}               
                    <ul className="flex items-center gap-4 px-3 h-full">
                      {createChatUsers
                        ?.filter((el) => {
                          return el.added;
                        })
                        .map((user, index) => {
                          return (
                            <li
                              key={index}
                              className="flex  gap-2 bg-slate-400 rounded-xl px-3 py-1 justify-start items-center shrink-0">

                              <p>{user.fullname}</p>
                              <i
                                className="fa-icon fa-solid fa-close text-xl hover:cursor-pointer text-gray-500 hover:text-red-900"
                                onClick={() => {
                                  ///DELETING USER ON CHAT ARRAY
                                  const updatedUser = {
                                    ...user,
                                    added: false,
                                  };
                                  const updatedUsers = [
                                    ...createChatUsers.filter((el) => {
                                      return el._id !== user._id;
                                    }),
                                    updatedUser,
                                  ];
                                  setCreateChatUsers(updatedUsers);
                                }}
                              ></i>
                            </li>
                          );
                        })}
                    </ul>
                </div>
                    
                    
                {/* LIST OF USERS */}
                <div id="create-chat" className='w-full flex justify-center overflow-y-auto h-[75%] pt-5'>
                    <ul className="flex flex-col justify-start gap-3 w-[40%]">
                        {createChatUsers
                            ?.filter((el) => {
                            return !el.added;
                            })
                            .map((user, index) => {
                            return (
                                <li
                                key={index}
                                onClick={() => {
                                    ///ADDING USER ON CHAT ARRAY
                                    const updatedUser = { ...user, added: true };
                                    const updatedUsers = [
                                    ...createChatUsers.filter((el) => {
                                        return el._id !== user._id;
                                    }),
                                    updatedUser,
                                    ];
                                    setCreateChatUsers(updatedUsers);
                                }}
                                className="flex gap-2 bg-slate-300 rounded-lg justify-start items-center hover:cursor-pointer hover:bg-slate-400"
                                >
                                <img
                                    src={user.picture}
                                    alt={user.fullname}
                                    className="w-[50px] h-[50px] rounded-full"
                                ></img>

                                <p>{user.fullname}</p>
                                </li>
                            );
                            })}
                    </ul>
                </div>
                    
            </div>

            {/* BUTTON FOR CREATE CHAT */}
            <div className='h-[10%] flex justify-end w-full px-3 pb-2'>
                <div
                    onClick={createChatDB}
                    className="self-end px-3 py-2 bg-lime-500 rounded-full font-bold  text-lg hover: cursor-pointer shadow-xl hover:bg-lime-600 hover:text-white"
                  >
                    Create Chat{" "}
                    <i className="fa-solid fa-plus text-xl pl-1"></i>
                </div>

            </div>
                  
                </div>
    </div>
  )
}
