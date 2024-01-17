
// IMPORT CSS
import "./modal.css"

export const Modal = ({data, onClose }) => {

  return (
    <div className=" fixed inset-0 flex items-center justify-center mt-48 mb-24 z-30">
      <div className="fixed h-full w-screen backdrop-blur-lg z-30 flex justify-center items-center"  >
        <div id="modal" className="h-[85vh] max-w-[800px] border  border-white bg-white dark:bg-darkModeGray rounded-lg z-40 overflow-y-auto p-10" style={{
          boxShadow: "0 0 15px -5px rgba(0, 0, 0, 0.5)",}}>
          <div className="flex justify-end">
            <button className="p-2  text-red-500 " onClick={onClose}><i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="font-semibold text-center text-3xl sm:text-5xl mt-4 mb-10">{data.title}</div>
          <div className="h-[80vh] flex justify-center items-center">
            {data.category === "image" ? (
              <img
                src={data.imageUrl}
                alt={data.title}
                className="bg-gray-200 rounded-3xl object-contain h-full"
              />
            ) : (
            <video controls className="bg-black rounded-3xl w-full h-full object-contain">
              <source src={data.imageUrl} type="video/mp4" />
            </video>
            )}
          </div>
          <p className="italic text-[.8rem] md:mx-20 text-right mt-10">
            {data.date.slice(0, 10)} - Barangay {data.barangay}
          </p>
          <div className="mt-10  sm:text-lg md:mx-20">{data.description}</div>
        </div>
      </div>
    </div>
    );
  };
  
 
  