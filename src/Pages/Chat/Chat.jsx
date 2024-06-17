import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import socketIOClient from "socket.io-client";
import chatService from "../../Services/chat.service";
import userService from "../../Services/user.service";
import { toast } from "react-toastify";
import axios from "axios";
import messageService from "../../Services/message.service";

const ENDPOINT = "http://localhost:5000";
let senderId;

function Chat({ headerColor, bodyColor, innerBodyColor  , socket , userData , setUserData}) {
  // const [userData, setUserData] = useState();
  const [isopenChat, setIsOpenChat] = useState(false);
  const [openChatId, setOpenChatId] = useState();
  const [openChatData, setOpenChatData] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [input, setInput] = useState("");

  const [chatIds, setChatIds] = useState();



  const getChatIds = async () => {
    try {
      const res = await chatService.getAllChatIds();
      if (res.status === 200) {
        console.log(res.data);
        setChatIds([...res.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    try {
      const res = await userService.getUser();
      if (res.status === 200) {
        console.log("userdata:", res.data);
        setUserData(res.data);
        senderId = res.data._id;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
    getChatIds();
  }, []);

  const handleOpenChat = async (id, receiverId) => {
    console.log("chat id is ", id);
    setOpenChatId(id);
    setIsOpenChat(true);

    const data = {
      senderId,
      chatId: id,
      receiverId
    };
    socket.emit("joinChat", data);
    try {
      const res = await messageService.getAllMessage(id);
      if (res.status === 200) {
        setMessages([...res.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
     if(socket){
      if (userData && socket && senderId) {
        socket.emit('cameOnChat' , senderId)

        const handleBeforeUnload = () => {
          socket.emit('cameOutOfChat', senderId);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          socket.emit('cameOutOfChat', senderId);
        };
      }
      socket.on("messages", (data) => {
        console.log("online data:", data);
        setMessages([...data]);
      });  
     }

  }, [socket , userData , senderId]);

  useEffect(()=>{
    if(socket){
      const handleMessage = (message) => {
        console.log(openChatId);
        if (openChatId && openChatId.toString() === message.chatId.toString()) {
          setMessages((prevMessages) => [...prevMessages, message]);
          setNewMessage("");
        }
      };

      socket.on("newMessage", handleMessage);
      return () => {
        socket.off("newMessage", handleMessage);
      };
    }



  },[openChatId])



  const sendMessage = () => {
    const data = {
      senderId: senderId,
      message: newMessage,
      chatId: openChatId,
      receiverId:openChatData._id
    };
    socket.emit("newMessage", data);
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleNewMsgOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <div className="px-[50px] py-[20px]">
        <div className="grid grid-cols-[350px,600px]">
          <div className={`${innerBodyColor}   shadow-xl pt-[20px]`}>
            <div className="p-[15px] pt-0 h-[80vh] overflow-y-scroll">
              <div className="relative">
                <div className="sticky z-[5] top-0 flex flex-row items-center">
                  <input
                    className={`w-full ${innerBodyColor}  px-[10px] py-[10px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                    type="text"
                    value=""
                    placeholder="search here..."
                  />
                  <div className="absolute top-1/2  right-0 -translate-x-1/2 -translate-y-1/2">
                    <SearchIcon />
                  </div>
                  <div className=""></div>
                </div>
                <div className="mt-5">
                  {chatIds?.map((elm, id) => {
                    return (
                      <>
                        <div className={`flex flex-row justify-between px-2 py-2 hover:${bodyColor} cursor-pointer rounded-[5px] mt-2`} onClick={() => {
                        setOpenChatData(elm.users);
                        handleOpenChat(elm._id , elm?.users?._id); 
                            }}>
                          <div
                            key={elm._id}
                            className={` flex flex-row gap-3`}
                            
                          >
                            <div
                              className={` w-[40px] relative h-[40px] ${bodyColor} rounded-[50%] `}
                            >
                              <div className="w-[30px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px]">
                                <img
                                  className=" rounded-[50%] w-full h-full object-cover"
                                  src="/mehul.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="">
                              <p className="text-[15px] font-sans font-[550]">
                                {elm.users.firstName.slice(0,10) + " " + elm?.users?.lastName.slice(0,10)}
                              </p>
                              <p className="text-[14px] font-sans font-[350]">
                                {elm?.latestMessage?.message.slice(0,20)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center gap-1">
                            <p className="text-[13px] font-[450]">
                              {" "}
                              {(() => {
                                const timestamp = new Date(
                                  elm?.latestMessage?.timestamp
                                );
                                const hours = timestamp.getHours().toString();
                                const minutes = timestamp
                                  .getMinutes()
                                  .toString()
                                  .padStart(2, "0");
                                return `${hours > 12 ? hours-12 : hours}:${minutes} ${hours>12 ? ' PM' : ' AM'}`;
                              })()}
                            </p>
                            <p className="text-[13px] font-[450]">
                           
                              {(()=>{
                                const timestamp = new Date(elm?.latestMessage?.timestamp);
                                return `${timestamp.toLocaleDateString()}`
                              })()}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {isopenChat && (
            <div className={` ${bodyColor}`}>
              <div className={`${innerBodyColor} pb-[15px] `}>
                <div
                  className={`p-1 px-[25px] bg-[grey] py-[10px] rounded-[5px] items-center flex flex-row gap-2`}
                >
                  <div
                    className={` w-[50px] relative h-[50px]  rounded-[50%] `}
                  >
                    <div className="w-[40px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40px]">
                      <img
                        className=" rounded-[50%] w-full h-full object-cover"
                        src="/mehul.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[15px] font-sans font-[550] align-middle text-white">
                      {openChatData?.firstName + " " + openChatData?.lastName}
                    </p>
                    {/* <p className="text-[14px] font-sans font-[350]">{""}</p> */}
                  </div>
                </div>
              </div>

              <div
                className={`w-full  ${innerBodyColor} shadow-l-none p-[20px] pt-0 shadow-lg`}
              >
                <div
                  className="h-[65vh] overflow-y-scroll pb-[50px]"
                  ref={messagesEndRef}
                >
                  {messages?.map((elm, id) => {
                    return (
                      <>
                        {elm.senderId === senderId ? (
                          <div className="p-4">
                            <div className="flex flex-row-reverse gap-x-4 space-x-4">
                              <div
                                className={`w-[60px] h-[60px] ${bodyColor} rounded-full relative flex-shrink-0`}
                              >
                                <img
                                  className="rounded-full w-full h-full object-cover"
                                  src="/mehul.jpg"
                                  alt=""
                                />
                              </div>
                              <p className=" text-[14px]  font-sans font-[400] ps-[50px]">
                                {elm.message}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4">
                            <div className="flex items-start  space-x-4">
                              <div
                                className={`w-[60px] h-[60px] ${bodyColor} rounded-full relative flex-shrink-0`}
                              >
                                <img
                                  className="rounded-full w-full h-full object-cover"
                                  src="/mehul.jpg"
                                  alt=""
                                />
                              </div>
                              <p className=" text-[14px]  ps-[15px] font-sans font-[400] pe-[50px]">
                                {elm.message}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
                <div className="">
                  <div className="sticky  flex flex-row items-center">
                    <input
                      className={`w-full ${innerBodyColor} pe-[40px]  px-[10px] py-[10px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                      type="text"
                      value={newMessage}
                      name="newMessage"
                      placeholder="search here..."
                      onKeyDown={(e) => {
                        handleKeyDown(e);
                      }}
                      onChange={(e) => {
                        handleNewMsgOnChange(e);
                      }}
                    />
                    <div className="absolute top-1/2  right-0 -translate-x-1/2 -translate-y-1/2">
                      <SendIcon onClick={sendMessage} />
                    </div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
