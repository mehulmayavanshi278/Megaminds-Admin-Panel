import React, { useEffect, useState } from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import GroupIcon from '@mui/icons-material/Group';
import Recentorderchart from './charts/Recentorderchart';
import TopProducts from './TopProducts';
import WebVisitor from './charts/WebVisitor';
import Topcustomer from './Topcustomer';
import RecentOrder from './RecentOrder';
import { theme } from '../../Pages/Homepage/Homepage';
import orderService from '../../Services/order.service';
import { toast } from 'react-toastify';


function Homepage01({innerBodyColor , bodyColor , socket}) {


  const [upperData , setUpperData]= useState();

  const getupperData = async()=>{
    try{
      const res = await orderService.getUpperData();
      if(res.status===200){
        console.log("upperData" , res.data)
        setUpperData(res.data);
      }
    }catch(err){
      console.log(err);
    }
  }


  useEffect(()=>{
    getupperData();
    if(socket){
      const  handleNotification = (Notification)=>{
        toast.success( Notification?.name + '  sent you  Message 3' , {autoClose: 1000 });
      }
      socket.on('new notification' , handleNotification);

      return ()=>{
        socket.off('new notification' )
      }
    }
    
  },[socket]);

  return (
    <div>
      <div className=''>
         <div className='grid grid-cols-4 gap-[25px]'>

            <div className={` ${innerBodyColor} shadow-sm p-[25px] lg:col-span-1 col-span-2 rounded-[15px] `}>
            <div className='flex flex-row gap-[15px]'>

           
              <div className='w-[50px] h-[50px] bg-green-600 flex flex-row justify-center items-center'>
              <TrendingUpIcon style={{fontSize:"40px",color:"white"}}/>
              </div>
              <div className=''>
                <div className=''>
                    <p className='text-[14px] font-[400] text-[#728872]'>Total Sales</p>
                </div>
                <div className=''>
                    <h1 className='text-[24px] font-[600] '>{upperData?.totalSold}</h1>
                </div>
                </div>
              </div>
              <div className='mt-[40px] h-[4px] bg-[navy]'></div>
            </div>
            <div className={` ${innerBodyColor} shadow-sm p-[25px] lg:col-span-1 col-span-2 rounded-[15px] `}>
            <div className='flex flex-row gap-[15px]'>

           
              <div className='w-[50px] h-[50px] bg-green-600 flex flex-row justify-center items-center'>
              <CurrencyRupeeIcon style={{fontSize:"40px",color:"white"}}/>
              </div>
              <div className=''>
                <div className=''>
                    <p className='text-[14px] font-[400] text-[#728872]'>Total Income</p>
                </div>
                <div className=''>
                    <h1 className='text-[24px] font-[600] '><CurrencyRupeeIcon/>{upperData?.totalIncome.toFixed(2)}</h1>
                </div>
                </div>
              </div>
              <div className='mt-[40px] h-[4px] bg-[navy]'></div>
            </div>
            <div className={` ${innerBodyColor} shadow-sm p-[25px] lg:col-span-1 col-span-2 rounded-[15px] `}>
            <div className='flex flex-row gap-[15px]'>

           
              <div className='w-[50px] h-[50px] bg-green-600 flex flex-row justify-center items-center'>
              <NoteAddIcon style={{fontSize:"40px",color:"white"}}/>
              </div>
              <div className=''>
                <div className=''>
                    <p className='text-[14px] font-[400] text-[#728872]'>Orders Paid</p>
                </div>
                <div className=''>
                    <h1 className='text-[24px] font-[600] '><CurrencyRupeeIcon/>{upperData?.ordersPaid.toFixed(2)}</h1>
                </div>
                </div>
              </div>
              <div className='mt-[40px] h-[4px] bg-[navy]'></div>
            </div>
            <div className={`${innerBodyColor} shadow-sm p-[25px] lg:col-span-1 col-span-2 rounded-[15px] `}>
            <div className='flex flex-row gap-[15px]'>

           
              <div className='w-[50px] h-[50px] bg-green-600 flex flex-row justify-center items-center'>
              <GroupIcon style={{fontSize:"40px",color:"white"}}/>
              </div>
              <div className=''>
                <div className=''>
                    <p className='text-[14px] font-[400] text-[#728872]'>Total visitors</p>
                </div>
                <div className=''>
                    <h1 className='text-[24px] font-[600] '>34,945</h1>
                </div>
                </div>
              </div>
              <div className='mt-[40px] h-[4px] bg-[navy]'></div>
            </div>

         </div>

         <div className='grid grid-cols-11  gap-[20px] mt-6'>
  <div className={` h-[400px] p-[15px]  ps-0 rounded-[15px] ${innerBodyColor} shadow-sm   xl:col-span-4 lg:col-span-6 col-span-11`}>
     <div className='px-[25px] pb-[20px]'>
      <h1 className='text-[25px] font-sans font-[600]'>Recent Orders</h1>
     </div>
     <Recentorderchart/>
  </div>
  <div className={` h-[400px] p-[15px] rounded-[15px] ${innerBodyColor} shadow-sm   xl:col-span-4 lg:col-span-5 col-span-11`}>
  <div className='px-[15px] '>
      <h1 className='text-[25px] font-sans font-[600]'>Top Products</h1>
     </div>
     <div className='w-full overflow-x-scroll mt-3 px-[15px]'>
     <TopProducts innerBodyColor={innerBodyColor} bodyColor={bodyColor}/>
     </div>
   
  </div>
  <div className={`h-[400px] p-[15px] px-0 pe-[5px] rounded-[15px] ${innerBodyColor}  shadow-sm   xl:col-span-3 lg:col-span-6 col-span-11`}>
  <div className='px-[25px]  pb-[20px]'>
      <h1 className='text-[25px] font-sans font-[600]'>Website visitor</h1>
     </div>
     <WebVisitor/>
  </div>
  <div className={` ${innerBodyColor} h-[500px] p-[15px] rounded-[15px] shadow-sm   xl:col-span-3  lg:col-span-5 col-span-11`}>
  <div className='px-[15px]  flex flex-row justify-between'>
      <h1  className='text-[20px] font-sans font-[600]'>Top Customer</h1>
      <select className={` ${innerBodyColor} font-[300]`}>
        <option className='text-[14px] text-[#5d5959] font-[300]'>This week</option>
        <option className='text-[14px] text-[#5d5959] font-[300]'>This month</option>
      </select>
     </div>
     <div className='px-[15px]'>
      <Topcustomer/>
     </div>
  </div>
  <div className={` h-[500px] p-[15px] rounded-[15px] ${innerBodyColor} shadow-sm xl:col-span-8  lg:col-span-11 col-span-11 `}>
  <div className='px-[20px]  pb-[20px]'>
      <h1 className='text-[25px] font-sans font-[600]'>Recent Orders</h1>
     </div>
     <div className='px-[20px]'>
      <RecentOrder bodyColor={bodyColor}/>
     </div>
  </div>
</div>


      </div>
    </div>
  )
}

export default Homepage01
