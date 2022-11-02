const storageIDs = {
    JWT_TOKEN_ID: "jwt-token",
    USER_DB: "user-db",
    OTP: "otp",
}

class StorageHelpers{
    static save(itemID, item){
        localStorage.setItem(itemID, item)
    }
    static get(itemID){
        return localStorage.getItem(itemID)
    }
    static delete(itemID){
        return localStorage.removeItem(itemID)
    }
}

export {storageIDs, StorageHelpers}