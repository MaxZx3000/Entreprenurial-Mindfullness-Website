const JWT_TOKEN_ID = "jwt-token"

class StorageHelpers{
    static saveJWToken(jwtToken){
        localStorage.setItem(JWT_TOKEN_ID, jwtToken)
    }
    static loadJWTToken(){
        return localStorage.getItem(JWT_TOKEN_ID)
    }
    static deleteJWTToken(){
        return localStorage.removeItem(JWT_TOKEN_ID)
    }
}

export default StorageHelpers