import React, { useEffect, useState } from 'react'
import orderService from '../../Services/order.service';

function Topcustomer() {


    const [topCustomer , setTopCustomer] = useState();

    const getTopCustomer = async()=>{
        try{
          const res = await orderService.getTopCustomer();
          if(res.status===200){
            console.log("TopCustomer data" , res.data)
            setTopCustomer(res.data);
          }
        }catch(err){
          console.log(err);
        }
      }

    useEffect(()=>{
       getTopCustomer();
    },[]);

  return (
    <div>
             <table className="w-full mt-[25px]">
                <thead>
       
                </thead>
                <tbody>
                <tr className=''>
                    <th className='text-start text-[14px]'>Name</th>
                    <th className='text-center text-[14px]'>Total Money</th>
                </tr>
                <div className='mt-3'></div>
                
                { topCustomer?.slice(0,6)?.map((elm,id)=>{
                    return(
                        <>
                        <tr className='hover:bg-[#f1f1f4] cursor-pointer'>
                    <th className="py-[10px]">
                        <div className='flex flex-row justify-start items-start gap-2'>
                    
                                <div className='w-[40px]   h-[40px]'>
                                    <img className='w-full h-full rounded-[50%] object-cover' src='/mehul.jpg' alt='' />
                                </div>
                           
                            <div className='mt-0'>
                                <p className='text-[14px]  font-[500]'>{elm.customerDetails.firstName + " " + elm.customerDetails.lastName}</p>
                                <p className='text-[12px] text-[#5d5959] font-[400] text-start'>{elm.orderCount} purchased</p>
                            </div>
                        </div>
                    </th>
                    <th className="py-[10px] align-top text-center px-2">
                        <div className='mt-0 p-0 flex flex-col justify-start items-end'>
                            <p className='align-top text-start text-[14px] font-[400] text-[#5d5959]'>{"₹ " + elm.totalPrice}</p>
                        </div>
                    </th>
             
                  </tr>
                        </>
                    )
                })
}
           
              
        


                </tbody>
              </table>
    </div>
  )
}

export default Topcustomer
