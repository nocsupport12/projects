import React from 'react';

const MediaDrawer = ({ display, setOpenDrawer, mediaDrawer, handleMediaDrawer, setCurrentPage,}) => {
  
  
  return (
    <div className="">
      
      {/* Drawer */}
      <div className="fixed bottom-0 right-0 w-[50vh] h-[100vh] bg-gray-400 rounded-md z-50 flex flex-col justify-around">
        <div className="flex justify-end text-3xl px-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setOpenDrawer(false)}
          >
            &times;
          </button>
        </div>

        <div className='flex gap-2 justify-center'>
          <p className={`cursor-pointer ${mediaDrawer === "Media" ? "bg-primary text-white px-4 py-2 rounded-lg" : "px-4 py-2" }`} onClick={() => {handleMediaDrawer("Media") ; setCurrentPage(1)}}>Media</p>
          <p className={`cursor-pointer ${mediaDrawer === "Documents" ? "bg-primary text-white px-4 py-2 rounded-lg" : "px-4 py-2" }`} onClick={() => {handleMediaDrawer("Documents") ; setCurrentPage(1)}}>Documents</p>
        </div>

        <div className='h-full'>
          {mediaDrawer === "Media" && (
            display
          )}
          

          {mediaDrawer === "Documents" && (
            
            display
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaDrawer;
