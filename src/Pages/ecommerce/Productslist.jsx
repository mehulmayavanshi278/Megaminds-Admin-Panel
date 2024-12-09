import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Pagination, Box } from "@mui/material";
import productService from "../../Services/product.service";
import UpdateProduct from "./UpdateProduct";

function Productslist({innerBodyColor , bodyColor,openPopUp , isOpenEdit , setIsOpenEdit}) {
  const [page, setPage] = useState(1);

  const handlePagination = (event, value) => {
    console.log(value);
    setPage(value);
  };
  const [type, setType] = useState();
  const [tabType, setTabType] = useState();
  const [subTabType, setSubTabType] = useState();

  const [allProducts,setAllProducts] = useState();
  const getAllProducts = async()=>{
    try{
      const res = await productService.getAllProducts();
      if(res.status===200){
        console.log("All Products" , res.data);
        setAllProducts(res.data.data);
      }
    }catch(err){
      console.log(err);
    }
  }


  const [singleProduct , setSingleProduct] = useState();

  const  getSingleProductDetails=async(id)=>{
    try{
      const res = await productService.getSingleProduct(id);

      if(res.status===200){
        console.log("single Product",res.data);
        setSingleProduct(res.data);
      }
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
  getAllProducts();
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

{
  isOpenEdit && singleProduct  && <UpdateProduct innerBodyColor={innerBodyColor} singleProduct={singleProduct}/>
}

      <div className="">
        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-[26px] font-[600] ">{subTabType}</h1>
          </div>
          <div className="flex flex-row justify-center gap-2 items-center">
            <p className="text-[13px] font-[400] hover:underline cursor-pointer" onClick={()=>{window.location.href='/'}}>
              {type}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
            <p className="text-[13px] font-[400] hover:underline cursor-pointer" onClick={()=>{window.location.href='/Dashboard/Ecommerce/product list'}}>
              {tabType}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
            <p className="text-[13px] font-[400] hover:underline cursor-pointer">
              {subTabType}
            </p>
          </div>
        </div>

        <div className={`p-[25px] mt-4 ${innerBodyColor} shadow-sm rounded-[15px] `}>
          <div className="">
            <div className="flex flex-row justify-between items-center">
              <div className=" w-[400px] relative flex flex-row items-center">
                <input
                  className={` ${bodyColor} w-full px-[10px] py-[10px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  value=""
                  placeholder="search here..."
                />
                <div className="absolute top-1/2  right-0 -translate-x-1/2 -translate-y-1/2">
                  <SearchIcon />
                </div>
              </div>
              <div className="">
                <Button variant="contained" color="primary" onClick={()=>{window.location.href='add Products'}}>
                  Add Product
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[1px] my-[20px]  bg-[#cfcaca]"></div>
          <div className="grid grid-cols-1 ">
            <div className="col-span-1 overflow-x-scroll">
            <table className="w-[1500px] overflow-x-scroll">
      <thead>
        <tr className="">
          <th className="text-start text-[14px] px-4">Product</th>
          <th className="text-start text-[14px] px-4">Product Id</th>
          <th className="text-start text-[14px] px-4">Quantity</th>
          <th className="text-start text-[14px] px-4">Price</th>
          <th className="text-start text-[14px] px-4">Sell</th>
          <th className="text-start text-[14px] px-4">created Date</th>
          <th className="text-start text-[14px] px-4">Status</th>
          <th className="text-start text-[14px] px-4">Action</th>
        </tr>
        <div className="py-3"></div>
      </thead>
      <tbody>
        {allProducts?.slice(parseInt((page-1)*8) , (page*8))?.map((elm,id) => (
          <tr  className="hover:bg-[#f1f1f4] cursor-pointer" >
            <td className="py-2 px-4">
              <div className="flex flex-row justify-start items-center gap-[10px]">
                <div className={`w-[60px] relative h-[60px] ${bodyColor} rounded-[4px]`}>
                  <div className="w-[40px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40px]">
                    <img
                      className="w-full h-full object-cover"
                      src={elm?.images[0]}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-0 flex flex-col justify-center">
                  <p className="text-[14px]  font-[500]">
                    {elm.name}
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
                  {elm?.inventory?.stock}
                </p>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                  {elm.price}
                </p>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                  {elm?.sold || 0}
                </p>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                  {(()=>{
                    const timeStamp = new Date(elm?.createdAt);
                    return timeStamp.toLocaleDateString();
                  })()}
                </p>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="w-[80px]">
                <li className="align-top m-0 list-none text-[13px] p-1 px-[2] font-[500] text-center bg-[#e3f1e3] text-[green] rounded-[5px]">
                  {elm?.inventory?.status}
                </li>
              </div>
            </td>
            <td className="py-2 px-4">
              <div className="">
                  <div className="flex flex-row justify-start gap-3 ">
                    <RemoveRedEyeIcon style={{color:"blue"}}/>
                    <EditIcon style={{color:"orange"}} onClick={()=>{setIsOpenEdit(true);openPopUp();getSingleProductDetails(elm._id)}}/>
                    <DeleteForeverIcon style={{color:"red"}}/>
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
            count={parseInt((allProducts?.length/8)+1)}
            page={page}
            onChange={handlePagination}
            color="primary"
          />
        </Box>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Productslist;
