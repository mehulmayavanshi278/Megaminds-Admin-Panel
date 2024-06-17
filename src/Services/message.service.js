import axios from "axios"
import { BaseURL , getAllMessageApi} from "../Apis/Api"
import TokenHelper from "../Helpers/TokenHelper";


class messageService{
    getAllMessage= async(chatId)=>{
        return axios.get(BaseURL+getAllMessageApi+`?chatId=${chatId}`,{
            headers:{
                Authorization:TokenHelper.get()
            }
        })
    }
}

export default messageService = new messageService();