import MyFetch from "./my-fetch"
import StorageHelpers from "./storage-helpers"

class _UserGlobal{
    constructor(){
        if (_UserGlobal.instance == false){
            _UserGlobal.instance = this
        }
        return _UserGlobal.instance
    }
    // setUserData(userData){
    //    this.userData = userData
    // }
    // getUserData(){
    //     return this.userData
    // }
    async getUserFullData(){
        const fullUserData = await MyFetch.getUserData()
        return fullUserData.json
    }
    setJWTToken(jwtToken){
        StorageHelpers.saveJWToken(jwtToken)
    }
    getJWTToken(){
        return StorageHelpers.loadJWTToken()
    }
    logoutUser(){
        StorageHelpers.deleteJWTToken()
    }
    isLogin(){
        if (StorageHelpers.loadJWTToken() === null){
            return false
        }
        else{
            return true
        }
    }
}

const UserGlobal = new _UserGlobal()
export default UserGlobal