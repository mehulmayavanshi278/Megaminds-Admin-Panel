import axios from "axios";
import { BaseURL, createNotificationApi, getNotificationApi, updateNotificationApi } from "../Apis/Api";
import TokenHelper from "../Helpers/TokenHelper";



class notificationService{
   getAllNotifications = async()=>{
    return axios.get(BaseURL+getNotificationApi , {
        headers:{
            Authorization:TokenHelper.get()
        }
    })
   }
   createNotification = async(object)=>{
    return axios.post(BaseURL+createNotificationApi , object , {
        headers:{
            Authorization:TokenHelper.get()
        }
    })
   }

   updateNotification = async()=>{
    return axios.post(BaseURL+updateNotificationApi , {} , {
        headers:{
            Authorization:TokenHelper.get()
        }
    })
   }
}

export default notificationService = new notificationService();