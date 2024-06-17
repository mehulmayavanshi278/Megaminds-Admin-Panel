import axios from "axios"
import { BaseURL , orderChatApi , getAllOrdersApi , getProductsAdminApi , recentOrderApi , topCustomerApi, getSingleOrderApi} from "../Apis/Api"
import TokenHelper from "../Helpers/TokenHelper"

class orderService{
    getRecentOrderChartData = async()=>{
        return await axios.get(BaseURL+orderChatApi , {
            headers:{
                Authorization:TokenHelper.get()
            }
        })
    }

    getUpperData = async()=>{
        return await axios.get(BaseURL+getProductsAdminApi , {
            headers:{
                Authorization:TokenHelper.get()
            }
        })
    }
    getRecentOrders = async()=>{
        return await axios.get(BaseURL+recentOrderApi , {
            headers:{
                Authorization:TokenHelper.get()
            }
        })
    }
     getSingleOrder= async(id)=>{
        return await axios.get(BaseURL+getSingleOrderApi+id , {
            headers:{
                Authorization:TokenHelper.get()
            }
        })
    }
    getAllOrders = async()=>{
        return await axios.get(BaseURL+getAllOrdersApi , {
            headers:{
                Authorization:TokenHelper.get()
            }
        })
    }
    getTopCustomer = async()=>{
        return await axios.get(BaseURL+topCustomerApi , {
            headers:{
                Authorization:TokenHelper.get()
            }
        })
    }
}

export default orderService = new orderService();