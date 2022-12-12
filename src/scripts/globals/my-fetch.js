import FetchHelpers from "../utils/fetch-helpers"
import ApiEndpoint from "./api-endpoint"
import StorageHelpers from "./storage-helpers"
import UserGlobal from "./user-helpers"

class RequestJSONTemplate{
    static getGetMethodJSONData(contentType = "application/json"){
        return {
            method: 'GET',
            headers: {
                'Content-Type': contentType,
                mode: 'cors',
            },
        }
    }
    static getGetAuthorizationJSONData(contentType = "application/json"){
        return {
            method: 'GET',
            headers: {
                'Content-Type': contentType,
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
            ApiEndpoint.getUserEditLink(),
            jsonRequestData
        )
        return responseJSON
    }
    static async getHistories(){
        const jsonRequestData = RequestJSONTemplate.getGetAuthorizationJSONData()
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getHistoryLink(),
            jsonRequestData
        )
        return responseJSON
    }
    static async submitAnswer(requestJSONBody){
        const jsonRequestData = RequestJSONTemplate.getGetAuthorizationJSONData()
        jsonRequestData.method = "POST"
        jsonRequestData.body = JSON.stringify({
            "answer":  requestJSONBody
        });
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getQuestionLink(),
            jsonRequestData
        )

        return responseJSON
    }
    static async getAnswer(testID){
        const jsonRequestBody = RequestJSONTemplate.getGetAuthorizationJSONData();
        jsonRequestBody.method = "POST";
        jsonRequestBody.body = JSON.stringify({
            "id": testID
        })
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getAnswerLink(),
            jsonRequestBody,
        )
        return responseJSON
    }
    static async getQuestionData(){
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getQuestionLink(),
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
        requestBody.method = "DELETE"
        requestBody.body = JSON.stringify(password_json)
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
    static async getStatistics(){
        const requestBody = RequestJSONTemplate.getGetMethodJSONData()
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getStatisticsLink(),
            requestBody,
        )
        return responseJSON
    }
    static async authenticateUser(email, otp){
        const requestBody = RequestJSONTemplate.getGetAuthorizationJSONData()
        requestBody.method = 'PUT'
        requestBody.body = JSON.stringify({
            "secret_key": "em-2022-TUA717v3",
            "otp": otp,
        })
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getAuthenticateLink(email),
            requestBody,
        )
        return responseJSON;
    }
    static async sendEmailAuthentication(email){
        const requestBody = RequestJSONTemplate.getGetAuthorizationJSONData()
        requestBody.method = 'POST'
        requestBody.body = JSON.stringify({
            "email": email,
            "secret_key": "em-2022-TUA717v3",
        })
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getAuthenticateLink(email),
            requestBody,
        )
        return responseJSON;
    }
    static async reactivateAccount(email, password){
        const requestBody = RequestJSONTemplate.getGetAuthorizationJSONData();
        requestBody.method = 'PUT'
        requestBody.body = JSON.stringify({
            "email": email,
            "password": password
        })
        const responseJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getReactivateAccountLink(),
            requestBody
        )
        return responseJSON
    }
}

export default MyFetch