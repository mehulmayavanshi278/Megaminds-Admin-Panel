import React, { useEffect, useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { tabsObject, tabIcons , theme } from "../Pages/Homepage/Homepage";

function Sidebar({
  openTab,
  handleOpenBelowTab,
  expanded,
  setExpanded,
  isOpenSidebar,
  setIsOpenSidebar,
  setOpenTab,
  sidebarColor
}) {
  const [hasMounted, setHasMounted] = useState(false);
  // console.log(hasMounted);

  useEffect(() => {
    console.log(window.location.pathname);
    const path = window.location.pathname.split("/");
    console.log(path);
    path.length>2 && path[2] ?  setOpenTab(path[2]) : setOpenTab(path[1]);
    setHasMounted(true);
  }, []);
  return (
    <div >
      <div className={`${isOpenSidebar ? "" : ""}`}>
        <div
          className={` ${sidebarColor}  transition-[left] duration-300 ${
            isOpenSidebar ? "left-0 fixed" : "fixed left-[-280px]"
          } w-[280px]  h-[100vh] overflow-y-scroll  shadow-md `}
        >
          <div className="h-[80px] sticky z-10  top-0 py-[5px] px-[25px] flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start gap-2">
              <div className="w-[45px] h-[45px]">
                <img className="w-full rounded-[50%]" src="/logo.png" alt="" />
              </div>
              <div className="">
                {" "}
                <h1 className="font-[500] text-[32px] align-middle"> Mega </h1>
              </div>
            </div>
            <div
              className="flex flex-row items-center"
              onClick={() => {
                setIsOpenSidebar(false);
              }}
            >
              <MenuOpenIcon
                style={{
                  fontSize: "30px",
                  color: "grey",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          <div className="">
            <div className="px-[25px] py-3">
              <h1 className="text-[#c0b9b9] font-[500] text-[14px]">
                MAIN HOME
              </h1>
            </div>
          </div>

          <div className="">

            <div
              className={` ${
                openTab === "Dashboard"
                  ? "border border-l-[5px] border-b-0 border-r-0 border-t-0 border-l-[#3131fb]"
                  : ""
              }   `}
            >
              <div
                className={`rounded-[10px] hover:bg-[#e4e4ff] w-[240px] cursor-pointer mx-auto px-[10px] flex flex-row justify-between ${
                  openTab === "Dashboard" ? "bg-[#e4e4ff]" : ""
                }   py-[12px] `}
                onClick={() => {
                  handleOpenBelowTab("Dashboard");
                }}
              >
                <div className="flex flex-row justify-start gap-2">
                  <WidgetsIcon
                    style={{
                      color: ` ${openTab === "Dashboard" ? " #3131fb" : ""}`,
                    }}
                  />
                  <a
                     href="/Dashboard"
                    className={` list-none ${
                      openTab === "Dashboard" ? "text-[#3131fb]" : ""
                    } text-[16px]`}
                  >
                    Dashboard
                  </a>
                </div>
                <div className="cursor-pointer">
                  {/* <KeyboardArrowDownIcon
                    sx={{
                      color: `${
                        openTab === "Dashboard" ? " #3131fb" : "black"
                      }`,
                    }}
                  /> */}
                </div>
              </div>
            </div>
 
          </div>

          <div className="">
            <div className="px-[25px] py-[25px]">
              <h1 className="text-[#c0b9b9] font-[500] text-[14px]">
                All Pages
              </h1>
            </div>

            {Object.keys(tabsObject)
              .slice(1)
              .map((elm, id) => {
                const IconComponent = tabIcons[id];
                return (
                  <>
                    <div className="">
                      <div
                        className={` ${
                          openTab === elm
                            ? "border border-l-[5px] border-b-0 border-r-0 border-t-0 box-border border-l-[#3131fb]"
                            : ""
                        }   `}
                      >
                        <div
                          className={`rounded-[10px] hover:bg-[#e4e4ff] w-[240px] mx-auto px-[10px] flex flex-row justify-between cursor-pointer ${
                            openTab === elm ? "bg-[#e4e4ff]" : ""
                          }   py-[12px] `}
                          onClick={(e) => {
                            tabsObject[elm].length !== 0 && e.stopPropagation();
                            handleOpenBelowTab(elm);
                          }}
                        >
                          <div className=" w-full flex flex-row justify-start gap-2 cursor-pointer">
                            <IconComponent
                              style={{
                                color: ` ${openTab === elm ? " #3131fb" : ""}`,
                              }}
                            />
                            {tabsObject[elm].length === 0 ? (
                              <a
                                href={`/Dashboard/${elm}/${
                                  tabsObject[elm][0] || ""
                                }`}
                                className={` w-full font-[500] list-none ${
                                  openTab === elm
                                    ? "text-[#3131fb]"
                                    : ""
                                } text-[16px]`}
                              >
                                {elm}
                              </a>
                            ) : (
                              <li
                                className={`font-[500] list-none ${
                                  openTab === elm
                                    ? "text-[#3131fb]"
                                    : ""
                                } text-[16px]`}
                              >
                                {elm}
                              </li>
                            )}
                          </div>
                          {tabsObject[elm]?.length !== 0 && (
                            <div className="cursor-pointer">
                              <KeyboardArrowDownIcon
                                sx={{
                                  color: `${
                                    openTab === elm ? " #3131fb" : "black"
                                  }`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" w-[240px] mx-auto">
                        <div
                          className={`ps-[20px] pe-[20px] block transition-all ease-in-out  ${
                            expanded && openTab === elm
                              ? `max-h-[1000px]  ${
                                  hasMounted ? "duration-700" : ""
                                } `
                              : "max-h-[0px] duration-300 delay-0"
                          }`}
                          style={{ overflow: "hidden" }}
                        >
                          {tabsObject[elm]?.map((innerElm, id) => {
                            return (
                              <>
                                <a
                                  className="mt-1 list-none py-[6px] text-[14px] ps-[30px] pe-[15px] text-[#505050] font-[500] flex flex-row justify-between gap-2 cursor-pointer hover:bg-[#e4e4ff]"
                                  href={`/Dashboard/${elm}/${innerElm}`}
                                >
                                  {innerElm}
                                  {innerElm.includes("Add") && <AddIcon />}
                                </a>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
