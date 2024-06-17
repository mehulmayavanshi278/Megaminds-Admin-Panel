import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CropFreeIcon from "@mui/icons-material/CropFree";
import WidgetsIcon from "@mui/icons-material/Widgets";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  darkBody,
  darkTheme,
  lightBody,
  lightTheme,
  theme,
} from "../Pages/Homepage/Homepage";
import TokenHelper from "../Helpers/TokenHelper";
import notificationService from "../Services/notification.service";
import userService from "../Services/user.service";
import { toast } from "react-toastify";

function Navbar({
  isOpenSidebar,
  setIsOpenSidebar,
  setHeaderColor,
  headerColor,
  bodyColor,
  innerBodyColor,
  setBodyColor,
  setInnerBodyColor,
  setSideBarColor,
  openSettingSidebarPopup,
  handleThemeBgAll,
  setLightTheme,
  setDarkTheme,
  isopenDarkMode,
  setIsOpenDarkMode,
  socket
}) {
  const handleDarkMode = () => {
    if (!isopenDarkMode) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
    setIsOpenDarkMode(!isopenDarkMode);
  };

  const [isopenNotify, setIsOpenNotify] = useState(false);
  const [notifications, setNotifications] = useState();
  const [unreadNotification, setUnReadNotification] = useState(null);
  const [userData, setUserData] = useState();

  const handleNotificationsOpen = async (e) => {
    try {
      e.stopPropagation();
      setIsOpenNotify(!isopenNotify);
      if (unreadNotification !== 0) {
        const res = await notificationService.updateNotification();
        if (res.status === 200) {
          setUnReadNotification(0);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllNotification = async () => {
    try {
      const res = await notificationService.getAllNotifications();
      if (res?.status === 200) {
        console.log("notifications:", res.data);
        setNotifications(res.data?.last10Notifications);
        setUnReadNotification(res.data?.totalUnread);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    try {
      const res = await userService.getUser();
      if (res.status === 200) {
        console.log("userData", res.data);
        setUserData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
    getAllNotification();
  }, [headerColor]);

  useEffect(() => {
    //  if(socket){
    //   const  handleNotification = (Notification)=>{
    //     toast.success( Notification?.name + '  sent you  Message2');
    //   }
    //   socket.on('new notification' , handleNotification);
    //  }
  }, []);

  return (
    <>
      <div className={`sticky top-0 z-10 ${headerColor} `}>
        <div className={`sticky top-0 z-10 shadow-sm  px-[25px] py-[20px]`}>
          <div
            className={`grid ${
              isOpenSidebar
                ? "xl:grid-cols-[550px,1fr] lg:grid-cols-1fr"
                : "grid-cols-[50px,550px,1fr] lg:grid-cols[50px,1fr]"
            }   gap-[15px] items-center`}
          >
            {!isOpenSidebar && (
              <div className="">
                <KeyboardTabIcon
                  style={{
                    fontSize: "30px",
                    color: "grey",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setIsOpenSidebar(true);
                  }}
                />
              </div>
            )}
            <div className="">
              <div className="relative flex flex-row items-center">
                <input
                  className={`w-full ${headerColor}  px-[10px] py-[10px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  value=""
                  placeholder="search here..."
                />
                <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2">
                  <SearchIcon />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-[15px] items-center">
            <div className="w-[350px] flex flex-row justify-between">
              <div className="relative w-[35px] h-[35px] rounded-[50%] bg-[#efecec] cursor-pointer hover:bg-[#ddd3d3] hover:transition-all p-1">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  onClick={handleDarkMode}
                >
                  {isopenDarkMode ? (
                    <LightModeIcon style={{ backgroundColor: "none", color: "black" }} />
                  ) : (
                    <DarkModeIcon style={{ backgroundColor: "none", color: "black" }} />
                  )}
                </div>
              </div>
              <div className="relative w-[35px] h-[35px] rounded-[50%] bg-[#efecec] cursor-pointer hover:bg-[#ddd3d3] hover:transition-all p-1">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <NotificationsNoneIcon style={{ backgroundColor: "none", color: "black" }} />
                </div>
              </div>
              <div
                className="relative w-[35px] h-[35px] rounded-[50%] bg-[#efecec] cursor-pointer hover:bg-[#ddd3d3] hover:transition-all p-1"
                onClick={(e) => {
                  handleNotificationsOpen(e);
                }}
              >
                <div className="">
                  {unreadNotification !== 0 && (
                    <div
                      className={`absolute w-[10px] h-[10px] z-20 rounded-[50%] flex justify-center items-center ${
                        unreadNotification && "bg-[red]"
                      }  top-[-5px] right-0 p-2`}
                    >
                      <p className="text-[12px] text-white">
                        {unreadNotification}
                      </p>
                    </div>
                  )}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <NotificationsNoneIcon style={{ backgroundColor: "none", color: "black" }} />
                  </div>
                </div>
                {isopenNotify && (
                  <div
                    className={`w-[350px] ${headerColor} shadow-lg right-0 z-50 absolute top-[60px] p-[20px] rounded-[15px]`}
                  >
                    <div>
                      <p className="text-[15px] font-sans font-[650]">
                        Notification
                      </p>
                    </div>
                    <div className="mt-3">
                      {notifications?.map((elm, id) => (
                        <div
                          key={elm._id}
                          className={`flex flex-row justify-between px-2 py-1 hover:${bodyColor} cursor-pointer rounded-[5px] mt-2`}
                        >
                          <div className={` flex flex-row gap-3`}>
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
                              <p className="text-[13px] font-sans font-[550]">
                                {elm?.content || "unknown content"}
                              </p>
                              <p className="text-[12px] font-sans font-[350]">
                                {elm?.message.slice(0, 20)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center gap-1">
                            <p className="text-[12px] font-[450]">
                              {" "}
                              {(() => {
                                const timestamp = new Date(elm?.createdAt);
                                const hours = timestamp.getHours().toString();
                                const minutes = timestamp
                                  .getMinutes()
                                  .toString()
                                  .padStart(
                                    2, "0");
                                return `${
                                  hours > 12 ? hours - 12 : hours
                                }:${minutes} ${hours > 12 ? " PM" : " AM"}`;
                              })()}
                            </p>
                            <p className="text-[13px] font-[450]">
                              {(() => {
                                const timestamp = new Date(elm?.createdAt);
                                return `${timestamp.toLocaleDateString()}`;
                              })()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative w-[35px] h-[35px] rounded-[50%] bg-[#efecec] cursor-pointer hover:bg-[#ddd3d3] hover:transition-all p-1">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <ChatBubbleOutlineIcon style={{ backgroundColor: "none", color: "black" }} />
                </div>
              </div>
              <div className="relative w-[35px] h-[35px] rounded-[50%] bg-[#efecec] cursor-pointer hover:bg-[#ddd3d3] hover:transition-all p-1">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <CropFreeIcon style={{ backgroundColor: "none", color: "black" }} />
                </div>
              </div>
              <div className="relative w-[35px] h-[35px] rounded-[50%] bg-[#efecec] cursor-pointer hover:bg-[#ddd3d3] hover:transition-all p-1">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <WidgetsIcon style={{ backgroundColor: "none", color: "black" }} />
                </div>
              </div>
            </div>
            <div className="w-[100%] grid grid-cols-[auto,auto] items-center">
              <div className="">
                <div className="flex flex-row gap-[7px] items-center">
                  <div className="w-[35px] h-[35px]">
                    <img
                      className="rounded-[50%] w-full h-full object-cover"
                      src="https://megaminds001.s3.ap-southeast-2.amazonaws.com/1718090467262-tempImg22222.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-0">
                    <p className=" text-[16px] font-[500]">{userData?.firstName + " " + userData?.lastName}</p>
                    <p className="text-[grey] font-[300] text-[14px]">Admin</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center border border-solid border-b-0 border-t-0 border-r-0 border-l-[1px] ">
                <div
                  className=""
                  onClick={() => {
                    openSettingSidebarPopup();
                  }}
                >
                  <SettingsIcon style={{ fontSize: "30px" }} />
                </div>
              </div>
            </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
