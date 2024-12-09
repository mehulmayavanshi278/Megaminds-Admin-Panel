import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import orderService from "../../Services/order.service";

function Singleorder({innerBodyColor}) {
  const [type, setType] = useState();
  const [tabType, setTabType] = useState();
  const [subTabType, setSubTabType] = useState();
  const [orderId, setOrderId] = useState();


  const [singleOrder, setSingleOrder] = useState();
  const getSingleOrder = async(id)=>{
    try{
     const res =  await orderService.getSingleOrder(id)
     if(res.status===200){
      console.log("single Order" , res.data);
      setSingleOrder(res.data);
     }
    }catch(err){
      console.log(err);
    }
  }



  useEffect(() => {
    const path = window.location.pathname.split("/");
    console.log(path);
    setType(path[1]);
    setTabType(path[2]);
    path.length > 3 && setSubTabType(path[3].split("%20").join(" "));
    path.length > 4 && setOrderId(path[4]);
    getSingleOrder(path[4])
  }, []);
  return (
    <div>
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-[26px] font-[600] ">{subTabType}</h1>
          </div>
          <div className="flex flex-row justify-center gap-2 items-center">
            <p className="text-[13px] font-[400] hover:underline cursor-pointer" onClick={()=>{window.location.href='/'}}>
              {type}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }}/>
            <p className="text-[13px] font-[400] hover:underline cursor-pointer"  onClick={()=>{window.location.href='/Dashboard/Order/order list'}}>
              {tabType}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} onClick={()=>{window.location.href='/Dashboard/Order/order list'}}/>
            <p className="text-[13px] font-[400] hover:underline cursor-pointer">
              {subTabType}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
            <p className="text-[13px] font-[400] hover:underline cursor-pointer">
              {orderId}
            </p>
          </div>
        </div>

        <div className="  py-[20px]  ">
          <div class="grid   xl:grid-cols-3 grid-cols-1 gap-6">
            <div class="col-span-2 row-span-1">
              <div class={` ${innerBodyColor} p-6 rounded-lg shadow-sm mb-6`}>
                <div className="">
                  <p className="text-[15px] font-[500]">All Items</p>
                </div>
                <div className="h-[250px] overflow-x-scroll mt-[15px]">
                  <table className="w-full  overflow-y-scroll overflow-x-scroll">
                    <thead></thead>
                    <tbody>
                      <div className="mt-3"></div>

                      {singleOrder?.products?.map((elm,id) => {
                        return (
                          <>
                            <tr className="hover:bg-[#f1f1f4]  cursor-pointer">
                              <th className="py-2">
                                <div className="flex flex-row justify-start items-start gap-[20px]">
                                  <div className="w-[60px] relative h-[60px] bg-[#f1f1f4] rounded-[10px]">
                                    <div className="w-[40px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[40px]">
                                      <img
                                        className="w-full h-full object-cover"
                                        src={elm?.productId.images[0]}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-0">
                                    <p className="text-[16px]  font-[500]">
                                      {elm?.productId?.name}
                                    </p>
                                    <p className="text-[14px] text-[#5d5959] font-[300] text-start">
                                      
                                    </p>
                                  </div>
                                </div>
                              </th>
                              <th className="py-2 align-top px-2">
                                <div className="mt-0 p-0 flex flex-col justify-start items-start">
                                  <p className="align-top text-start text-[14px] font-[500] ">
                                    Quantity
                                  </p>
                                  <p className="align-top text-start text-[14px] font-[400] text-[#5d5959]">
                                    {elm?.quantity}
                                  </p>
                                </div>
                              </th>
                              <th className="py-2 align-top px-2">
                                <div className="align-top">
                                  <p className="text-start text-[14px] font-[500]">
                                    Price
                                  </p>
                                  <p className="text-start text-[14px] font-[400] text-[#5d5959]">
                                    {elm?.productId?.price}
                                  </p>
                                </div>
                              </th>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class={`${innerBodyColor} p-6 rounded-lg shadow-sm mb-6`}>
                <div className="h-[200px] overflow-x-scroll">
                  <table className="w-[700px]  overflow-y-scroll overflow-x-scroll">
                    <thead></thead>
                    <tbody>
                      <tr className="">
                        <th className="text-start text-[14px] px-2">
                          Cart Total
                        </th>
                        <th className="text-start text-[14px] px-2">Price</th>
                      </tr>

                      <div className="mt-3"></div>

                   
                            <tr className="hover:bg-[#f1f1f4] cursor-pointer">
                              <td className="py-2 align-top px-2">
                                <div className="mt-0 p-0 flex flex-col justify-start items-start">
                                  <p className="align-top text-start text-[15px] text-[#666] font-sans font-[400] ">
                                    subtotal:
                                  </p>
                                </div>
                              </td>
                              <td className="py-2 align-top px-2">
                                <div className="align-top">
                                  <p className="align-top text-start text-[15px]  font-sans font-[500] ">
                                  {singleOrder?.totalPrice.toFixed(2)}
                                  </p>
                                </div>
                              </td>
                            </tr>

                      <th className="py-2 align-top px-2">
                                <div className="mt-0 p-0 flex flex-col justify-start items-start">
                                  <p className="align-top text-start  text-[18px] font-[500] ">
                                    Total Price
                                  </p>
                                </div>
                              </th>
                      <th className="py-2 align-top px-2">
                                <div className="mt-0 p-0 flex flex-col justify-start items-start">
                                  <p className="align-top text-start text-red-500 text-[18px] font-[500] ">
                                    {singleOrder?.totalPrice.toFixed(2)}
                                  </p>
                                </div>
                              </th>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-span-1 space-y-6">
              <div class={`${innerBodyColor} p-6 rounded-lg shadow-sm`}>
              <div className="">
                  <p className="text-[16px] font-[600]">Summary</p>
                </div>
              <div className="grid grid-cols-[auto,1fr] gap-y-[5px] gap-x-[10px] mt-3">
                <div className="">
                    <p className="text-[#666] text-[16px] font-[400]">Order Id  </p>
                </div>
                <div className="">
                    <p className="text-[16px]  font-sans font-[550] px-2"> {singleOrder?._id}</p>
                </div>
                <div className="">
                    <p className="text-[#666] text-[16px] font-[400]">Date  </p>
                </div>
                <div className="">
                    <p className="text-[16px]  font-sans font-[550] px-2"> 
                    
                     {(()=>{ 
                      const timeStamp = new Date(singleOrder?.orderDate)
                      return timeStamp?.toLocaleDateString();
                      })()}


                     </p>
                </div>
                <div className="">
                    <p className="text-[#666] text-[16px] font-[400]">Total  </p>
                </div>
                <div className="">
                    <p className="text-[16px] text-red-500 font-sans font-[550] px-2"> {singleOrder?.totalPrice.toFixed(2)}</p>
                </div>
              </div>
              </div>

              <div class={` ${innerBodyColor} p-6 rounded-lg shadow-sm`}>
              <div className="">
                  <p className="text-[16px] font-[600]">Shipping Address</p>
                </div>
                <div className="mt-3">
                    <p>3517 W. Gray St. Utica, Pennsylvania 57867 </p>
                </div>
              </div>

              <div class={` ${innerBodyColor} p-6 rounded-lg shadow-sm`}>
              <div className="">
                  <p className="text-[16px] font-[600]">Payment Method</p>
                </div>
                <div className="mt-3">
                    <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability. </p>
                </div>
              </div>

              <div class={` ${innerBodyColor} p-6 rounded-lg shadow-sm`}>
              <div className="">
                  <p className="text-[16px] font-[600]">Expected Delievery Date</p>
                </div>
                <div className="mt-3">
                 <p> 20 Nov 2023</p> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singleorder;
