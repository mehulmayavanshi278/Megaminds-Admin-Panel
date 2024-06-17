import React, { useEffect, useState } from 'react'
import { theme } from '../../Pages/Homepage/Homepage'
import orderService from '../../Services/order.service';
import productService from '../../Services/product.service';

function TopProducts({innerBodyColor , bodyColor}) {

    const [topProducts , setTopProducts] =  useState();

    const   getTopProducts = async()=>{
        try{
            const res = await productService.getTopProducts();
            if(res.status===200){
              console.log(" top products Data" , res.data)
              setTopProducts(res.data);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
      getTopProducts();
    },[]);
  return (
    <div>
      <div className=' overflow-x-scroll'>

     
                    <table className="w-[700px] overflow-x-scroll">
                <thead>
       
                </thead>
                <tbody>

             
                
                <div className='mt-3'></div>
                
                { topProducts?.slice(0,4).map((elm,id)=>{
                    return(
                        <>
                        <tr className='hover:bg-[#f1f1f4] cursor-pointer'>
                    <th className="py-2">
                        <div className='flex flex-row justify-start items-start gap-[20px]'>
                            <div className={`w-[60px] relative h-[60px] ${bodyColor} rounded-[10px]`}>
                                <div className='w-[40px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[40px]'>
                                    <img className='w-full h-full object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxfrd4wI6J8H-TTm5xSWZXPglddGveslM8Og3I4u_bA&s' alt='' />
                                </div>
                            </div>
                            <div className='mt-0'>
                                <p className='text-[16px] font-[500]'>{elm?.name}</p>
                                <p className='text-[14px] text-[#5d5959] font-[300] text-start'>{elm.inventory.stock} Items</p>
                            </div>
                        </div>
                    </th>
                    <th className="py-2 align-top px-2">
                        <div className='mt-0 p-0 flex flex-col justify-start items-start'>
                        <p className='align-top text-start text-[14px] font-[500] '>Sold</p>
                            <p className='align-top text-start text-[14px] font-[400] text-[#5d5959]'>{elm.sold} Items</p>
                        </div>
                    </th>
                    <th className="py-2 align-top px-2">
                    <div className='align-top'>
                         
                            <p className='text-start text-[14px] font-[500]'>unSold</p>
                            <p className='text-start text-[14px] font-[400] text-[#5d5959]'>{elm.inventory.stock - elm.sold} Items</p>
                        </div>
                    </th>
                    <th className="align-top py-2 px-2">
                       <li className='align-top m-0   list-none text-[13px] p-1 px-2 font-[500] text-center bg-[#e3f1e3] text-[green] rounded-[5px]'>{elm.inventory.status}</li>
                    </th>
                  </tr>
                        </>
                    )
                })
}
           
              
        


                </tbody>
              </table>
              </div>
    </div>
  )
}

export default TopProducts
