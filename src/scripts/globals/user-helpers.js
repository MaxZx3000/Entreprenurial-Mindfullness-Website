import MyFetch from "./my-fetch"
import {storageIDs, StorageHelpers} from "./storage-helpers"

class _UserGlobal{
    constructor(){
        if (_UserGlobal.instance == false){
            _UserGlobal.instance = this
        }
        return _UserGlobal.instance
    }
    // async getUserFullData(){
    //     const fullUserData = await MyFetch.getUserData()
    //     return fullUserData.json
    // }
    saveUserData(userJSON){
        const jsonUserStringify = JSON.stringify(userJSON)
        StorageHelpers.save(storageIDs.USER_DB, jsonUserStringify)
    }
    getUserData(){
        const jsonUser = StorageHelpers.get(storageIDs.USER_DB)
        return JSON.parse(jsonUser)
    }
    deleteUserData(){
        StorageHelpers.delete(storageIDs.USER_DB)
    }
    setJWTToken(jwtToken){
        StorageHelpers.save(storageIDs.JWT_TOKEN_ID, jwtToken)
    }
    getJWTToken(){
        return StorageHelpers.get(storageIDs.JWT_TOKEN_ID)
    }
    logoutUser(){
        StorageHelpers.delete(storageIDs.JWT_TOKEN_ID)
        StorageHelpers.delete(storageIDs.USER_DB)
    }
    isLogin(){
        if (StorageHelpers.get(storageIDs.JWT_TOKEN_ID) === null){
            return false
        }
        else{
            return true
        }
    }
}

const UserGlobal = new _UserGlobal()
export default UserGlobal