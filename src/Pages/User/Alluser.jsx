import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Pagination, Box } from "@mui/material";
import userService from "../../Services/user.service";
import UpdateUser from "./UpdateUser";
import { useNavigate } from "react-router-dom";

function Alluser({ bodyColor , innerBodyColor , isOpenEdit , openPopUp , setIsOpenEdit}) {
  const history = useNavigate();
  const [page, setPage] = useState(1);

  const handlePagination = (event, value) => {
    console.log(value);
    setPage(value);
  };
  const [type, setType] = useState();
  const [tabType, setTabType] = useState();
  const [subTabType, setSubTabType] = useState();

  const[allUsers, setAllUsers] = useState();
  const[singleUser, setSingleUser] = useState();

  const getAllUSers=async()=>{
    try{
      const res=await userService.getAllUsers();
      if(res.status===200){
        console.log(res.data);
        setAllUsers(res.data);
      }
    }catch(err){
      console.log(err);
    }
  }

  const getSingleUser = async(id)=>{
    console.log(id);
    try{
     const res=await userService.getSingleUser(id);
     if(res.status===200){
      console.log(res.data)
      setSingleUser(res.data);
     }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getAllUSers();
  },[]);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    console.log(path);
    setType(path[1]);
    setTabType(path[2]);
    path.length > 3 && setSubTabType(path[3].split("%20").join(" "));
  }, []);
  return (
    <>
      <div className="">


      {
  isOpenEdit && singleUser  && <UpdateUser innerBodyColor={innerBodyColor} singleUser={singleUser}/>
}

        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-[26px] font-[600] ">{subTabType}</h1>
          </div>
          <div className="flex flex-row justify-center gap-2 items-center">
            <p className="text-[13px] font-[400] hover:underline cursor-pointer" onClick={()=>{window.location.href='/'}}>
              {type}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }}/>
            <p className="text-[13px] font-[400] hover:underline cursor-pointer" onClick={()=>{window.location.href='/Dashboard/User/All user'}}>
              {tabType}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
            <p className="text-[13px] font-[400] hover:underline cursor-pointer">
              {subTabType}
            </p>
          </div>
        </div>

        <div className={` p-[25px] mt-4 ${innerBodyColor} shadow-sm rounded-[15px] `}>
          <div className="">
            <div className="flex flex-row justify-between items-center">
              <div className=" w-[400px] relative flex flex-row items-center">
                <input
                  className={` ${innerBodyColor} w-full px-[10px] py-[10px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  value=""
                  placeholder="search here..."
                />
                <div className="absolute top-1/2  right-0 -translate-x-1/2 -translate-y-1/2">
                  <SearchIcon />
                </div>
              </div>
              <div className="">
                <Button variant="contained" color="primary"onClick={()=>{window.location.href='Add New User'}}>
                  Add New User
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[1px] my-[20px]  bg-[#cfcaca]"></div>
          <div className="grid grid-cols-1 ">
            <div className="col-span-1 overflow-x-scroll">
              <table className="w-[1200px] overflow-x-scroll">
                <thead>
                  <tr className="">
                    <th className="text-start text-[14px] px-4">User</th>
                    <th className="text-start text-[14px] px-4">Phone</th>
                    <th className="text-start text-[14px] px-4">Email</th>
                    <th className="text-start text-[14px] px-4">Action</th>
                  </tr>
                  <div className="py-3"></div>
                </thead>
                <tbody> 
                  {allUsers?.slice((page-1)*10, page*10)?.map( (elm,id) => (
                    <tr className="hover:bg-[#f1f1f4] transition-all duration-100 cursor-pointer">
                      <td className="py-2 px-4">
                        <div className="flex flex-row justify-start items-center gap-[10px]">
                          <div className={` w-[60px] rounded-[50%] relative h-[60px]  ${bodyColor} `}>
                            <div className="w-[40px] rounded-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40px]">
                              <img
                                className="w-full h-full object-cover"
                                src={`${elm.profileImg}`}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="mt-0 flex flex-col justify-center">
                            <p className="text-[14px]  font-[500]">
                              {`${elm.firstName} ${elm.lastName}`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-0 p-0 flex flex-col justify-center">
                          <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                            {elm.phoneNo}
                          </p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-0 p-0 flex flex-col justify-center">
                          <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                            {elm.email}
                          </p>
                        </div>
                      </td>

                      <td className="py-2 px-4">
                        <div className="">
                          <div className="flex flex-row justify-start gap-3 ">
                            <RemoveRedEyeIcon style={{ color: "blue" }} />
                            <EditIcon style={{ color: "orange" }} onClick={()=>{setIsOpenEdit(true);openPopUp();getSingleUser(elm._id)}}/>
                            <DeleteForeverIcon style={{ color: "red" }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-2">
            <Box sx={{ width: "400px", margin: "0 auto", textAlign: "center" }}>
              <Pagination
                count={parseInt((allUsers?.length/10)+1)}
                page={page}
                onChange={handlePagination}
                color="primary"
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alluser;
