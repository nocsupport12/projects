import { Button, Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";

export const ModalRemove = ({
  isSenderRemove,
  setModalRemove,
  onRemove,
  unsendMessage,
  messageId,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const messageIds = messageId;

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  const handleRemove = async (messageId) => {
    setLoading(true);
    if (selectedOption && messageId) {
      // Call the onRemove function with the selected option
      onRemove(selectedOption);

      // Call the unsendMessage function with the selected option and messageId
      await unsendMessage(selectedOption, messageIds);
      // Close the modal
      setLoading(false);
      setModalRemove(false);
    } else {
      toast({
        title: "Please Select",
        status: "warning",
        duration: "2000",
        isClosable: true,
        position: "top",
      });
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center backdrop-blur-sm  z-50 ">
      <div className="flex flex-col pt-5 pb-10 lg:w-[800px] bg-gray-800 text-white">
        <div className="flex justify-between border-b ">
          <div></div>
          <div className="py-2 text-xl sm:text-2xl font-semibold text-center pt-10">
            Who do you want to remove this message for?
          </div>
          {/* <div onClick={()=>setMorePicture(false)}>X mekis</div> */}
          <span className="cursor-pointer pr-3">
            <i
              onClick={() => setModalRemove(false)}
              className="fa-solid fa-x"
            ></i>
          </span>
        </div>
        {/* CONTENT FOR UNSEND AND REMOVE FOR YOU */}
        <div className="flex py-8">
          <div className="flex flex-col">
            {isSenderRemove && (
              <>
                <div className="flex  gap-2  items-center px-5 pb-2">
                  <input
                    type="radio"
                    checked={selectedOption === "everyone"}
                    onChange={() => handleRadioChange("everyone")}
                  />
                  <p>Unsend for everyone</p>
                </div>
                <div className="px-10 pb-8">
                  <p className="text-[14px]">
                    This message will be unsent for everyone in the chat. Others
                    may have already seen it.
                  </p>
                </div>
              </>
            )}
            <div className="flex  gap-2  items-center px-5 pb-2">
              <input
                type="radio"
                checked={selectedOption === "you"}
                onChange={() => handleRadioChange("you")}
              />
              <p>Remove for you</p>
            </div>
            <div className="px-10">
              <p className="text-[14px]">
                This message will be remove for you but others will see the chat.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end pr-3">
                <button className="bg-primary px-2 py-2 rounded-lg ">Remove</button>

            </div> */}
        <Flex justify="end" pr={5}>
          <Button
            colorScheme="blue"
            width={{base:"30%", md: "15%"}}
            style={{ marginTop: 15 }}
            onClick={handleRemove}
            isLoading={loading}
          >
            Remove
          </Button>
        </Flex>
      </div>
    </div>
  );
};
