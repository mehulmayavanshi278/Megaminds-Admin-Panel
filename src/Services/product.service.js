import axios from "axios"
import { BaseURL, createProductApi, topProductsApi , updateProductApi, getAllProductsApi, getSingleProductApi } from "../Apis/Api"
import TokenHelper from "../Helpers/TokenHelper"

class productService{

    createProduct = async(body)=>{
        return axios.post(BaseURL+createProductApi , body , {
            Headers:{
                'Content-Type': 'multipart/form-data',
                authorization:TokenHelper.get(),

            }
        })
    }
    getSingleProduct = async(id)=>{
        return axios.get(BaseURL+getSingleProductApi+id , {
            Headers:{
                authorization:TokenHelper.get(),

            }
        })
    }
    updateProduct = async(id , object)=>{
        return axios.post(BaseURL+updateProductApi+id , object , {
            Headers:{
                'Content-Type': 'multipart/form-data',
                authorization:TokenHelper.get(),

            }
        })
    }
    getAllProducts = async(body)=>{
        return axios.get(BaseURL+getAllProductsApi , {
            Headers:{
                authorization:TokenHelper.get(),

            }
        })
    }
    getTopProducts = async(body)=>{
        return axios.get(BaseURL+topProductsApi , {
            Headers:{
                authorization:TokenHelper.get(),

            }
        })
    }


}

export default productService = new productService();