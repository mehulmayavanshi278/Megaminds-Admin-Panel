// const BaseURL = "http://localhost:5000";
const BaseURL = "https://megaminds-backend.onrender.com";




const registerApi = "/user/create";
const loginApi = "/user/login";
const updateUserApi = "/user/update";
const loginWithGoogleApi = "/user/loginWithGoogle";
const getUserApi="/user/getuser"
const getAllUsersApi="/user/All"
const deleteUserApi="/user/delete"

const getAllChatIdsApi = '/chat/getChatIds';


const getAllMessageApi = '/message/getAllMessage';


const createProductApi ="/product/create"
const getAllProductsApi = '/product/getProducts'
const getSingleProductApi = '/product/getproduct/'
const updateProductApi = '/product/update/'


const getNotificationApi = '/notification/get'
const createNotificationApi = '/notification/create'
const updateNotificationApi = '/notification/update'


const topCustomerApi = '/order/topCustomer'
const recentOrderApi = '/order/recentOrder'
const orderChatApi = '/order/orderChat'
const getAllOrdersApi = '/order/all';
const getSingleOrderApi = '/order/';


const topProductsApi = '/product/topproducts'
const getProductsAdminApi = '/product/getProductsAdmin'

export { BaseURL , getAllChatIdsApi , registerApi,
    loginApi,
    updateUserApi,
    loginWithGoogleApi,
    getUserApi,
    getAllUsersApi,
    deleteUserApi,
    getAllMessageApi,
    createProductApi,
    getAllProductsApi,
    getSingleProductApi,
    updateProductApi,
    getNotificationApi,
    createNotificationApi,
    updateNotificationApi,
    topCustomerApi,
recentOrderApi,
getAllOrdersApi,
getSingleOrderApi,
orderChatApi,
topProductsApi,
getProductsAdminApi,
}