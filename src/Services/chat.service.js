import axios from "axios";
import { BaseURL , getAllChatIdsApi} from "../Apis/Api";
import TokenHelper from "../Helpers/TokenHelper";

class chatService{

    getAllChatIds = ()=>{
        return axios.get(BaseURL+getAllChatIdsApi , {
            headers:{
                "authorization":TokenHelper.get()
            }
        })
    }


}

export default chatService = new chatService();