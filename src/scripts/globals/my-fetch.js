import FetchHelpers from "../utils/fetch-helpers"
import ApiEndpoint from "./api-endpoint"
import StorageHelpers from "./storage-helpers"
import UserGlobal from "./user-helpers"

class RequestJSONTemplate{
    static getGetMethodJSONData(){
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                mode: 'cors',
            },
        }
    }
    static getGetAuthorizationJSONData(){
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${UserGlobal.getJWTToken()}`,
                'mode': 'cors'
            }
        }
    }
}

class MyFetch{
    static async getStatusData(){
        const statusJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getStatusLink(),
            RequestJSONTemplate.getGetMethodJSONData()
        )
        return statusJSON
    }
    static async getAgeData(){
        const ageJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getAgeLink(),
            RequestJSONTemplate.getGetMethodJSONData()
        )
        return ageJSON
    }
    static async getBusinessData(){
        const businessJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getBusinessLink(),
            RequestJSONTemplate.getGetMethodJSONData()
        )
        return businessJSON
    }
    static async getIsAuthenticated(){
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getIsAuthenticatedLink(),
            FetchHelpers.getDefaultRequestBody()
        )
        return responseJSON.isAuthenticated
    }
    static async logoutUser(){
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getLogoutLink(),
            FetchHelpers.getDefaultRequestBody()
        )
        return responseJSON
    }
    static async userCheck(username, email){
        const requestJSON = RequestJSONTemplate.getGetMethodJSONData()
        requestJSON['body'] = {
            'username': username,
            'email': email
        }
        console.log(requestJSON)
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getUserCheckLink(),
            requestJSON
        )
        return responseJSON
    }
    static async editProfile(requestJSONBody){
        const jsonRequestData = RequestJSONTemplate.getGetAuthorizationJSONData()
        jsonRequestData.method = 'PUT'
        jsonRequestData.body = JSON.stringify(requestJSONBody)
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getUserLink(),
            jsonRequestData
        )
        return responseJSON
    }
    static async saveAnswer(requestJSONBody){
        const jsonRequestData = RequestJSONTemplate.getGetAuthorizationJSONData()
        jsonRequestData.method = "PUT"
        jsonRequestData.body = JSON.stringify(requestJSONBody)

        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getAnswerLink(),
            jsonRequestData
        )
        
        return responseJSON
    }
    static async submitAnswer(requestJSONBody){
        const jsonRequestData = RequestJSONTemplate.getGetAuthorizationJSONData()
        jsonRequestData.method = "POST"
        jsonRequestData.body = JSON.stringify(requestJSONBody)

        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getAnswerLink(),
            jsonRequestData
        )

        return responseJSON
    }
    static async getAnswer(){
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getAnswerLink(),
            RequestJSONTemplate.getGetAuthorizationJSONData(),
        )
        return responseJSON
    }
    static async getJWTAuthenticationTest(){
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getJWTAuthenticationTestLink(),
            requestBody,
        )
        return responseJSON
    }
    static async getUserData(){
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getUserLink(),
            RequestJSONTemplate.getGetAuthorizationJSONData()
        )
        return responseJSON
    }
    static async getUserCurrentScore(){
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getUserScoreLink(),
            RequestJSONTemplate.getGetAuthorizationJSONData()
        )
        return responseJSON
    }
    static async getDeleteAccountLink(password){
        const password_json = {
            'password': password
        }
        const requestBody = RequestJSONTemplate.getGetAuthorizationJSONData()
        requestBody.body = JSON.stringify(password_json)
        requestBody.method = "DELETE"
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getUserLink(),
            requestBody
        )
        return responseJSON
    }
    static async changePassword(requestJSONBody){
        const requestBody = RequestJSONTemplate.getGetAuthorizationJSONData()
        requestBody.method = "PUT"
        requestBody.body = JSON.stringify(requestJSONBody)
        
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.changePassword(),
            requestBody
        )
        console.log(responseJSON)
        return responseJSON
    }
    static async getScore(){
        const requestBody = RequestJSONTemplate.getGetMethodJSONData()
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getScoresLink(),
            requestBody
        )
        return responseJSON
    }
}

export default MyFetch