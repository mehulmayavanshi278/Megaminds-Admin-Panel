
class tokenHelper {
    constructor(){
        this.key = "token";
    }

    get(key){
     return window.localStorage.getItem(key || this.key);
    }
    create(key,value){
        return window.localStorage.setItem(key,value);
    }
    delete(key){
        return window.localStorage.removeItem(key);
    }
    deleteAll(){
        return window.localStorage.clear();
    }

}

export default  new tokenHelper();

