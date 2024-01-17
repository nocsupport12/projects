

const SideDrawerOther = ({setSideDrawerOther, handleMediaDrawer, setOpenConversationModal}) => {
  
  
  return (
    <div className="">
      
      {/* Drawer */}
      <div className="fixed bottom-0 right-0 w-[40vh] h-[100vh] bg-gray-400 rounded-md z-50 flex flex-col ">
        <div className="flex justify-end text-3xl px-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setSideDrawerOther(false)}
          >
            &times;
          </button> 
        </div>
        
        {/* VIEW FOR IMAGES/VIDEO AND DOCUMENTS */}
        <div className="px-10 pt-10">
            <div className='flex gap-2 justify-between items-center pb-5'>
                
                <p>View media and files</p>
                <span
                className="cursor-pointer "
                onClick={() => {handleMediaDrawer("Media"); setSideDrawerOther(false)}}
            >
                <i className="fa-solid fa-image"></i>
                </span>
            </div>

            <div className='flex gap-2 justify-between items-center '>           
                <p>Search</p>
                <span
                    className="cursor-pointer "
                    onClick={() => {setOpenConversationModal(true); setSideDrawerOther(false)}}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>
        </div>
        

        
      </div>
    </div>
  );
};

export default SideDrawerOther;
