import { toast } from "react-toastify";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes ,  useLocation } from "react-router-dom";
import Homepage, { theme } from "./Pages/Homepage/Homepage";
import React, { useEffect, useState } from "react";
import Sidebar from "./Partials/Sidebar";
import Navbar from "./Partials/Navbar";
import Productslist from "./Pages/ecommerce/Productslist";
import AddnewProduct from "./Pages/ecommerce/AddnewProduct";
import Categorylists from "./Pages/Category/Categorylists";
import Addcategory from "./Pages/Category/Addcategory";
import Orderlists from "./Pages/Order/Orderlists";
import Singleorder from "./Pages/Order/Singleorder";
import Alluser from "./Pages/User/Alluser";
import AddNewUser from "./Pages/User/AddNewUser";
import Gallery from "./Pages/Gallery/Gallery";
import CheckIcon from "@mui/icons-material/Check";
import Login from "./Pages/Login/Login";
import { CleaningServices, Token } from "@mui/icons-material";
import TokenHelper from "./Helpers/TokenHelper";
import Signup from "./Pages/Signup/Signup";
import Chat from "./Pages/Chat/Chat";
import socketIOClient from "socket.io-client";
import userService from "./Services/user.service";

const modes = ["Light", "Dark"];
const bgType = ["white" , "#1f1f35", "#1E293B"];

function App() {
  const [openTab, setOpenTab] = useState();
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  const handleOpenBelowTab = (val) => {
    console.log(val);
    setOpenTab(val);
    console.log(window.location);
    openTab === val ? setExpanded(!expanded) : setExpanded(true);
  };
  const [expanded, setExpanded] = useState(true);

  const [headerColor, setHeaderColor] = useState();
  const [sidebarColor, setSideBarColor] = useState();
  const [bodyColor, setBodyColor] = useState();
  const [innerBodyColor, setInnerBodyColor] = useState();

  const [isopenDarkMode, setIsOpenDarkMode] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isThemeMode, setIsThemeMode] = useState(true);
  const [currMode, setCurrMode] = useState();
  const [currHeaderBgType, setCurrHeaderBgType] = useState(TokenHelper.get('currheaderBg' || ""));
  const [currSidebarBgType, setCurrSidebarBgType] = useState(TokenHelper.get('currsideBarBg' || ""));
  const [isopenSettingSideBar, setIsOpenSettingSidebar] = useState(false);
  const [isOpenPopUp , setIsOpenPopUp] =useState(false);
  const [isOpenEdit , setIsOpenEdit] = useState(false);

  const handleOpacityTransition = (val) => {
    setVisible(false);
    setIsThemeMode(val);
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);
  };

  const openPopUp= ()=>{
    setIsOpenPopUp(true);
  }
  const closePopUp = () => {
    document.body.style.overflow = "scroll";
    setIsOpenSettingSidebar(false);
    setIsOpenPopUp(false);
    setIsOpenEdit(false);
  };
  const openSettingSidebarPopup = () => {
    setIsOpenSettingSidebar(true);
    setIsOpenPopUp(true)
    // document.body.style.overflow = "hidden";
  };
  const handleclearAllBtn = () => {};

  const handleThemeBgAll = () => {
    setHeaderColor(TokenHelper.get("headerBg"));
    setSideBarColor(TokenHelper.get("sideBarBg"));
    setBodyColor(TokenHelper.get("bodyBg"));
    setInnerBodyColor(TokenHelper.get("innderBodyBg"));
    setCurrMode(TokenHelper.get("theme"));
  };

  const setDarkTheme = () => {
    setIsOpenDarkMode(true);
    TokenHelper.create("headerBg", "text-[#cbb9b9] bg-[#1E293B]");
    TokenHelper.create("sideBarBg", "text-[#cbb9b9] bg-[#1E293B]");
    TokenHelper.create("innderBodyBg", "text-[#cbb9b9] bg-[#1E293B]");
    TokenHelper.create("bodyBg", "bg-[#1f1f35]");
    TokenHelper.create("theme", "Dark");

    TokenHelper.delete("currheaderBg");
    TokenHelper.delete("currsideBarBg");
    handleThemeBgAll();
  };
  const setLightTheme = () => {
    setIsOpenDarkMode(false);
    TokenHelper.create("headerBg", "text-black bg-white");
    TokenHelper.create("sideBarBg", "text-black bg-white");
    TokenHelper.create("bodyBg", "bg-[#f1f1f4]");
    TokenHelper.create("innderBodyBg", "text-black bg-white");
    TokenHelper.create("theme", "Light");

    TokenHelper.delete("currheaderBg");
    TokenHelper.delete("currsideBarBg");
    handleThemeBgAll();
  };

  const setThemeColor = (state1 , state2 , key , val)=>{

    let  text= val==='white' ? 'text-black' : 'text-white';
    TokenHelper.create(key,'bg-['+val.toString()+'] '+text);
    TokenHelper.create('curr'+key , val)
   console.log(key);
   console.log(val);
    // console.log(state)
    state2(TokenHelper.get('curr'+key));
    console.log("header is :" , TokenHelper.get(key) , " now");
    state1(TokenHelper.get(key));
  }


  const location = window.location;
  const isLoginPage = location.pathname === '/login' || location.pathname==="/signup";
  

  const [userData, setUserData] = useState(null);
  const getUserData=async()=>{
    try{
     const res= await userService.getUser();
     if(res.status===200){
      console.log(res.data);
      setUserData(res.data);
     }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {

    // if(!TokenHelper.get()){
    //   window.location.href='/login';
    // }  
    getUserData();
    setHeaderColor(
      TokenHelper.get("headerBg") ||
        TokenHelper.create("headerBg", "text-black bg-white")
    );
    console.log("headre bg is" , TokenHelper.get('headerBg'));
    setSideBarColor(
      TokenHelper.get("sideBarBg") ||
        TokenHelper.create("sideBarBg", "text-black bg-white")
    );
    setBodyColor(
      TokenHelper.get("bodyBg") || TokenHelper.create("bodyBg", "bg-[#f1f1f4]")
    );
    setInnerBodyColor(
      TokenHelper.get("innderBodyBg") ||
        TokenHelper.create("innderBodyBg", "text-black bg-white")
    );
    setCurrMode(
      TokenHelper.get("theme") || TokenHelper.create("theme", "Light")
    );
    handleThemeBgAll();
  }, []);


  const ENDPOINT = "http://localhost:5000";
  const [socket, setSocket] = useState(null);
  







  useEffect(() => {


      const newSocket = socketIOClient(ENDPOINT);
      console.log("in app")
      setSocket(newSocket);
  


      return () => {
        newSocket.disconnect();
      };
    






  }, []);

  useEffect(() => {
    console.log("userdata" ,userData);
    console.log("socket" , socket);
    console.log("tring to register");

    if (userData && socket) {
      socket.emit('register', userData._id);
    }


  }, [userData, socket]);

  return (
    <>
      <div className="relative">
      
      { !isLoginPage && <div
          className={` ${
            isOpenPopUp ? "block" : "hidden"
          } absolute top-0 left-0 w-full h-full z-20 bg-black opacity-[0.6]`}
          onClick={() => {
            closePopUp();
          }}
        ></div>}

    { !isLoginPage&&   <div className="">
          {/*  positon fixed  ,  if it is relative or absolute then it would be visible initially    */}
          <div
            className={`   fixed  right-[-650px]  opacity-1  w-[600px] transition-[right]  duration-300 z-30 h-[100vh]  bg-white rounded-[20px] rounded-e-none py-[20px] px-[35px]    
     ${isopenSettingSideBar ? "block right-[0px] " : "  right-[-650px]"}`}
          >
            <div className="">
              <p className="text-[22px] font-[500]">Setting</p>
            </div>
            <div
              className={` bg-[#ecf0f4] rounded-[15px] py-[10px]  px-[10px] grid grid-cols-[1fr,1fr] mt-3`}
            >
              <div className="">
                <p
                  className={` ${
                    isThemeMode ? "bg-white " : "bg-[#ecf0f4]"
                  }  rounded-[10px] py-[8px] text-center font-[550] font-sans text-[17px]`}
                  onClick={() => {
                    handleOpacityTransition(true);
                  }}
                >
                  Theme Style
                </p>
              </div>
              <div className="">
                <p
                  className={` ${
                    !isThemeMode ? "bg-white " : "bg-[#ecf0f4]"
                  } rounded-[10px] py-[8px] text-center font-[550] font-sans text-[17px]`}
                  onClick={() => {
                    handleOpacityTransition(false);
                  }}
                >
                  Theme Colors
                </p>
              </div>
            </div>
            {isThemeMode ? (
              <div
                className={`mt-5   ${
                  visible
                    ? "opacity-100 duration-500 transition-opacity"
                    : "opacity-0"
                }`}
              >
                <div className="">
                  <p className="text-[black] font-[650] font-sans text-[14px]">
                    Theme Color Mode
                  </p>
                </div>
                <div className="mt-2">
                  <div className="flex flex-row justify-start gap-[20px] ">
                    {modes?.map((elm, id) => {
                      return (
                        <>
                          <div
                            id={elm}
                            className={`  ${
                              currMode === elm ? "bg-[#6666eb]" : "bg-[#ecf0f4]"
                            }  w-[170px]  rounded-[7px] px-[15px]`}
                            onClick={() => {
                              elm === "Light"
                                ? setLightTheme()
                                : setDarkTheme();
                            }}
                          >
                            <div className="flex flex-row justify-start gap-[10px] items-center py-[12px]">
                              <div className="w-[30px] bg-white h-[30px] flex flex-row justify-center items-center border border-1 border-solid border-[black] rounded-[50%]">
                                {currMode === elm && <CheckIcon />}
                              </div>
                              <div className="">
                                <p
                                  className={` ${
                                    currMode === elm
                                      ? "text-[white]"
                                      : "text-black"
                                  } t font-[550]`}
                                >
                                  {elm}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}

                    <div className="w-[170px]  rounded-[7px] px-[15px]"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`mt-5   ${
                  visible
                    ? "opacity-100 duration-500 transition-opacity"
                    : "opacity-0"
                }`}
              >
                <div className="mt-2">
                  <div className="">
                    <p className="text-[black] font-[650] font-sans text-[14px]">
                      Menu Background Color
                    </p>
                    <div className="mt-2 flex flex-row gap-[10px]">
                      {bgType?.map((elm, id) => {
                        return (
                          <>
                            <div
                              className={` w-[40px] h-[60px] bg-[${elm}] border border-1px rounded-lg flex flex-row justify-center items-center`}
                              onClick={() => {
                                setThemeColor( setSideBarColor , setCurrSidebarBgType , 'sideBarBg' ,   elm);
                              }}
                            >
                              {currSidebarBgType === elm && (
                                <CheckIcon style={{ color: "#c0b9b9" }} />
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <p className="text-[#c0b9b9] font-[500] text-[13px] mt-2">
                      Note:If you want to change color Menu dynamically change
                      from below Theme Primary color picker
                    </p>
                  </div>
                </div>

                <div className="my-[20px] h-[1px] bg-[#eccdcd]"></div>

                <div className="mt-2">
                  <div className="">
                    <p className="text-[black]  font-[650] font-sans text-[14px]">
                      Header Background Color
                    </p>
                    <div className="mt-2 flex flex-row gap-[10px]">
                      {bgType?.map((elm, id) => {
                        return (
                          <>
                            <div
                              className={` w-[40px] h-[60px] bg-[${elm}]   border border-1px rounded-lg flex flex-row justify-center items-center`}
                              onClick={() => {
                                setThemeColor( setHeaderColor , setCurrHeaderBgType , 'headerBg' , elm);
                              }}
                            >
                              {currHeaderBgType === elm && (
                                <CheckIcon style={{ color: "#c0b9b9" }} />
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <p className="text-[#c0b9b9] font-[500] text-[13px] mt-2">
                      Note:If you want to change color Menu dynamically change
                      from below Theme Primary color picker
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              className={` relative mt-[30px] bg-[#6666eb] rounded-[20px]  ${
                visible
                  ? "opacity-100 duration-500 transition-opacity"
                  : "opacity-0"
              }`}
            >
              <p
                className="text-white text-[16px] font-[650] py-[15px] text-center w-full"
                onClick={() => {
                  handleclearAllBtn();
                }}
              >
                Clear All
              </p>
            </div>
          </div>
        </div>}

        <div>

          <div className="">
            <div
              className={` ${!isLoginPage ? 'grid' : ''}  duration-300 ${""} ${
                isOpenSidebar
                  ? "  grid-cols-[280px,1fr]"
                  : "grid-cols-[0px,1fr] "
              }  gap-0`}
             
            >
             {!isLoginPage && <Sidebar
                openTab={openTab}
                setOpenTab={setOpenTab}
                expanded={expanded}
                handleOpenBelowTab={handleOpenBelowTab}
                setExpanded={setExpanded}
                isOpenSidebar={isOpenSidebar}
                setIsOpenSidebar={setIsOpenSidebar}
                sidebarColor={sidebarColor}
              />}

              <div className="">

               { !isLoginPage && <Navbar
                  isOpenSidebar={isOpenSidebar}
                  setIsOpenSidebar={setIsOpenSidebar}
                  headerColor={headerColor}
                  setHeaderColor={setHeaderColor}
                  setInnerBodyColor={setInnerBodyColor}
                  setBodyColor={setBodyColor}
                  setSideBarColor={setSideBarColor}
                  bodyColor={bodyColor}
                  innerBodyColor={innerBodyColor}
                  openSettingSidebarPopup={openSettingSidebarPopup}
                  setLightTheme={setLightTheme}
                  setDarkTheme={setDarkTheme}
                  isopenDarkMode={isopenDarkMode}
                  setIsOpenDarkMode={setIsOpenDarkMode}
                  socket={socket}
                />}

                <div className={`  ${bodyColor} ${ !isLoginPage ? 'min-h-[90vh]' : 'h-full' } p-[25px]`}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/"  element={ !TokenHelper.get() ? <Navigate to='/login'/> : <Navigate to="/Dashboard" />} />
                      <Route
                        path="/Dashboard"
                        element={
                          !TokenHelper.get() ? <Navigate to='/login'/> :
                          <Homepage
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                            socket={socket}
                          />
                        }
                      />
                      <Route
                        path="/Dashboard/Ecommerce/Add Products"
                        element={
                          <AddnewProduct
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                          />
                        }
                      ></Route>
                      <Route
                        path="/Dashboard/ecommerce/product list"
                        element={
                          !TokenHelper.get() ? <Navigate to='/login'/> :
                          <Productslist
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                            openPopUp={openPopUp}
                            isOpenEdit={isOpenEdit}
                            setIsOpenEdit={setIsOpenEdit}
                          />
                        }
                      ></Route>
                      <Route
                        path="/Dashboard/Category/Add Category"
                        element={
                          !TokenHelper.get() ? <Navigate to='/login'/> :
                          <Addcategory
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                          />
                        }
                      ></Route>
                      <Route
                        path="/Dashboard/Category/Category list"
                        element={
                          !TokenHelper.get() ? <Navigate to='/login'/> :
                          <Categorylists
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                          />
                        }
                      ></Route>
                      <Route
                        path="/Dashboard/Order/order list"
                        element={
                          !TokenHelper.get() ? <Navigate to='/login'/> :
                          <Orderlists
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                          />
                        }
                      ></Route>
                      <Route
                        path="/Dashboard/Order/order detail/:id"
                        element={
                          !TokenHelper.get() ? <Navigate to='/login'/> :
                          <Singleorder
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                          />
                        }
                      ></Route>
                      <Route
                        path="/Dashboard/user/All user"
                        element={
                          !TokenHelper.get() ? <Navigate to='/login'/> :
                          <Alluser
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                            isOpenEdit={isOpenEdit}
                            setIsOpenEdit={setIsOpenEdit}
                            openPopUp={openPopUp}
                          />
                        }
                      ></Route>
                      <Route
                        path="/Dashboard/user/Add New user"
                        element={
                          !TokenHelper.get() ? <Navigate to='/login'/> :
                          <AddNewUser
                            innerBodyColor={innerBodyColor}
                            bodyColor={bodyColor}
                          />
                        }
                      ></Route>
                      <Route
                        path="/Dashboard/Gallery"
                        element={<Gallery />}
                      ></Route>
                      <Route
                        path="/login"
                        element={<Login />}
                      ></Route>
                      <Route
                        path="/signup"
                        element={<Signup />}
                      ></Route>
                      <Route
                        path="/Dashboard/chat"
                        element={ !TokenHelper.get() ? <Navigate to='/login'/> : <Chat innerBodyColor={innerBodyColor}
                        bodyColor={bodyColor}
                        headerColor={headerColor}
                        socket={socket}
                        userData={userData}
                        setUserData={setUserData}
                         />}
                      ></Route>
                    </Routes>
                  </BrowserRouter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
