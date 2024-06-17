import React, { useState  , useEffect} from "react";
import { Pagination, Box } from "@mui/material";
import { theme } from "../../Pages/Homepage/Homepage";
import orderService from "../../Services/order.service";

function RecentOrder({bodyColor}) {
  const [page, setPage] = useState(1);

  const handlePagination = (event, value) => {
    console.log(value);
    setPage(value);
  };

  const [recentOrders , serRecentOrders]= useState();

  const getRecentOrders = async()=>{
    try{
      const res = await orderService.getRecentOrders();
      if(res.status===200){
        console.log("recent Orders" , res.data)
        serRecentOrders(res.data);
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getRecentOrders();
  },[])

  return (
    <div>
      <div className=" overflow-x-scroll">
        <table className="w-[1000px] overflow-x-scroll">
          <thead></thead>
          <tbody>
            <tr className="">
              <th className="text-start text-[14px]">Product</th>
              <th className="text-start text-[14px]">Customer</th>
              <th className="text-start text-[14px]">Product Id</th>
              <th className="text-start text-[14px]">quantity</th>
              <th className="text-start text-[14px]">price</th>
              <th className="text-start text-[14px]">Status</th>
            </tr>

            <div className="mt-4"></div>

            {recentOrders?.slice((page-1)*4 , page*4)?.map((elm,id) => {
              return (
                <>
                  <tr className="hover:bg-[#f1f1f4] cursor-pointer">
                    <th className="py-2">
                      <div className="flex flex-row justify-start items-center gap-[10px]">
                        <div className={`w-[60px] relative h-[60px] ${bodyColor} rounded-[4px]`}>
                          <div className="w-[40px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[40px]">
                            <img
                              className="w-full h-full object-cover"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxfrd4wI6J8H-TTm5xSWZXPglddGveslM8Og3I4u_bA&s"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="mt-0 flex flex-col justify-center">
                          <p className="text-[14px]  font-[500] ">
                            {elm?.productDetails.name}
                          </p>
                        </div>
                      </div>
                    </th>
                    <th className="py-2 align-middle px-2">
                      <div className="mt-0 p-0 flex flex-col justify-center  ">
                        <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                         
                          {elm.customerDetails.firstName + " " + elm.customerDetails.lastName}
                        </p>
                      </div>
                    </th>
                    <th className="py-2 align-middle px-2">
                      <div className="mt-0 p-0 flex flex-col justify-center  ">
                        <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                        {elm.productDetails._id}
                        </p>
                      </div>
                    </th>
                    <th className="py-2 align-middle px-2">
                      <div className="mt-0 p-0 flex flex-col justify-center  ">
                        <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                          {elm.totalQuantity}
                        </p>
                      </div>
                    </th>
                    <th className="py-2 align-middle px-2">
                      <div className="mt-0 p-0 flex flex-col justify-center  ">
                        <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                          {"₹" + elm.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </th>

                    <th className="align-middle py-2 ">
                      <div className="w-[80px]">
                        <li className="align-top m-0   list-none text-[13px] p-1 px-0  font-[500] text-center bg-[#e3f1e3] text-[green] rounded-[5px]">
                          {elm.status}
                        </li>
                      </div>
                    </th>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-2">
        <Box sx={{ width: "400px", margin: "0 auto", textAlign: "center" }}>
          <Pagination
            count={parseInt((recentOrders?.length/4)+1)}
            page={page}
            onChange={handlePagination}
            color="primary"
          />
        </Box>
      </div>
    </div>
  );
}

export default RecentOrder;
