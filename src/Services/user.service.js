import axios from "axios";


import { BaseURL ,getAllUsersApi , getUserApi ,  registerApi , loginApi , updateUserApi , deleteUserApi} from "../Apis/Api";
import TokenHelper from "../Helpers/TokenHelper";

class userService {

  getAllUsers = async()=>{
    return await axios.get(BaseURL+getAllUsersApi);
  }

  getUser = async () => {
    try {
      return await axios.get(BaseURL + getUserApi, {
        headers: {
          Authorization: TokenHelper.get(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  getSingleUser = async (id) => {
    try {
      return await axios.get(BaseURL + getUserApi+`/${id}`, {
        headers: {
          Authorization: TokenHelper.get(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  signup = async (data) => {
      console.log("signup data", data);
      return await axios.post(BaseURL + registerApi, data);
  };

  login = async (data) => {
 
      return await axios.post(BaseURL + loginApi, data);

  };
  update = async (id , data) => {
    try {
      console.log("tok", TokenHelper.get());
      return await axios.post(BaseURL + updateUserApi+`/${id}`, data, {
        headers: {
          Authorization: TokenHelper.get(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  delete = async (id) => {
    try {
      return await axios.post(BaseURL + deleteUserApi + `/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
}

export default userService = new userService();
