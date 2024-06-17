import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Pagination, Box } from "@mui/material";
import orderService from "../../Services/order.service";

function Orderlists({innerBodyColor , bodyColor}) {
    const [page, setPage] = useState(1);

    const handlePagination = (event, value) => {
      console.log(value);
      setPage(value);
    };
    const [type, setType] = useState();
    const [tabType, setTabType] = useState();
    const [subTabType, setSubTabType] = useState();

    const [allOrders,setAllOrders] = useState();
    const getAllOrders = async()=>{
      try{
        const res = await orderService.getAllOrders();
        if(res.status===200){
          console.log("All orders" , res.data);
          setAllOrders(res.data);
        }
      }catch(err){
        console.log(err);
      }
    }
    useEffect(()=>{
     getAllOrders();
    },[]);

    useEffect(() => {
      const path = window.location.pathname.split("/");
      console.log(path);
      setType(path[1]);
      setTabType(path[2]);
      path.length > 3 && setSubTabType(path[3].split("%20").join(" "));
    }, []);
  return (
    <div>
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-[26px] font-[600] ">{subTabType}</h1>
          </div>
          <div className="flex flex-row justify-center gap-2 items-center">
            <p className="text-[13px] font-[400] hover:underline cursor-pointer">
              {type}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
            <p className="text-[13px] font-[400] hover:underline cursor-pointer">
              {tabType}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
            <p className="text-[13px] font-[400] hover:underline cursor-pointer">
              {subTabType}
            </p>
          </div>
        </div>

        <div className={` ${innerBodyColor} p-[25px] mt-4  shadow-sm rounded-[15px] `}>
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
              {/* <div className="">
                <Button variant="contained" color="primary">
                  Add Product
                </Button>
              </div> */}
            </div>
          </div>

          <div className="h-[1px] my-[20px]  bg-[#cfcaca]"></div>
          <div className="grid grid-cols-1 ">
            <div className="col-span-1 overflow-x-scroll">
            <table className="w-[1500px] overflow-x-scroll">
      <thead>
        <tr className="">
          <th className="text-start text-[14px] px-4">Product</th>
          <th className="text-start text-[14px] px-4">Order Id</th>
          <th className="text-start text-[14px] px-4">Quantity</th>
          <th className="text-start text-[14px] px-4"> Total Price</th>

          <th className="text-start text-[14px] px-4"> Date</th>
          <th className="text-start text-[14px] px-4">Status</th>
          {/* <th className="text-start text-[14px] px-4">Action</th> */}
        </tr>
        <div className="py-3"></div>
      </thead>
      <tbody>
        {allOrders?.slice(parseInt((page-1)*8),(page*8))?.map((elm,id) => (
          <tr  className="hover:bg-[#f1f1f4] cursor-pointer" onClick={()=>{window.location.href=`order detail/${elm._id}`}}>
            <td className="py-2 px-4">
              <div className="flex flex-row justify-start items-center gap-[10px]">
                <div className={`w-[60px] relative h-[60px] ${bodyColor} rounded-[4px]`}>
                  <div className="w-[40px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40px]">
                    <img
                      className="w-full h-full object-cover"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxfrd4wI6J8H-TTm5xSWZXPglddGveslM8Og3I4u_bA&s"
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-0 flex flex-col justify-center">
                  <p className="text-[14px] text-[black] font-[500]">
                    {}
                  </p>
                </div>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                  {elm._id}
                </p>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                  {22}
                </p>
              </div>
            </td>

            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                  {elm?.totalPrice.toFixed(2)}
                </p>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                {(()=>{
                    const timeStamp = new Date(elm?.orderDate);
                    return timeStamp.toLocaleDateString();
                  })()}
                </p>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="w-[80px]">
                <li className="align-top m-0 list-none text-[13px] p-1 px-0 font-[500] text-center bg-[#e3f1e3] text-[green] rounded-[5px]">
                  {elm?.paymentStatus}
                </li>
              </div>
            </td>
            {/* <td className="py-2 px-4">
              <div className="">
                  <div className="flex flex-row justify-start gap-3 ">
                    <RemoveRedEyeIcon style={{color:"blue"}}/>
                    <EditIcon style={{color:"orange"}} />
                    <DeleteForeverIcon style={{color:"red"}}/>
                  </div>
              </div>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
            </div>
          </div>
          <div className="mt-2">
        <Box sx={{ width: "400px", margin: "0 auto", textAlign: "center" }}>
          <Pagination
            count={(parseInt(allOrders?.length/8)+1)}
            page={page}
            onChange={handlePagination}
            color="primary"
          />
        </Box>
      </div>
        </div>
      </div>
  </div>
  )
}

export default Orderlists
