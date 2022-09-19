const BASE_URL = {
    API_ENDPOINT: 'http://localhost:5000'
}

const _API_ENDPOINT = { 
    USER_CHECK: `${BASE_URL.API_ENDPOINT}/user-check`,
    LOGIN: `${BASE_URL.API_ENDPOINT}/login`,
    REGISTER: `${BASE_URL.API_ENDPOINT}/register`,
    USER: `${BASE_URL.API_ENDPOINT}/user`,
    CHANGE_PASSWORD: `${BASE_URL.API_ENDPOINT}/change-password`,
    COUNTRY: `${BASE_URL.API_ENDPOINT}/country`,
    PROVINCE: `${BASE_URL.API_ENDPOINT}/province`,
    PROVINCE_ALL: `${BASE_URL.API_ENDPOINT}/province-all`,
    STATUS: `${BASE_URL.API_ENDPOINT}/status`,
    AGE: `${BASE_URL.API_ENDPOINT}/age`,
    BUSINESS: `${BASE_URL.API_ENDPOINT}/business`,
    QUESTION: `${BASE_URL.API_ENDPOINT}/questions`,
    SCORE: `${BASE_URL.API_ENDPOINT}/score`,
    IS_AUTHENTICATED: `${BASE_URL.API_ENDPOINT}/authenticated`,
    LOGOUT: `${BASE_URL.API_ENDPOINT}/logout`,
    ANSWER: `${BASE_URL.API_ENDPOINT}/answer`,
    JWT_AUTHENTICATION_TEST: `${BASE_URL.API_ENDPOINT}/jwt-authentication-test`,
    USER_SCORE: `${BASE_URL.API_ENDPOINT}/user-score`
};

class ApiEndpoint{
    static getUserCheckLink(){
        return `${_API_ENDPOINT.USER_CHECK}`;
    }
    static getLoginLink(){
        return `${_API_ENDPOINT.LOGIN}`;
    }
    static getRegisterLink(){
        return `${_API_ENDPOINT.REGISTER}`;
    }
    static getUserLink(){
        return `${_API_ENDPOINT.USER}`;
    }
    static changePassword(){
        return `${_API_ENDPOINT.CHANGE_PASSWORD}`;
    }
    static getCountryLink(){
        return `${_API_ENDPOINT.COUNTRY}`;
    }
    static getProvinceLink(){
        return `${_API_ENDPOINT.PROVINCE}`;
    }
    static getProvinceAllLink(){
        return `${_API_ENDPOINT.PROVINCE_ALL}`;
    }
    static getStatusLink(){
        return `${_API_ENDPOINT.STATUS}`;
    }
    static getAgeLink(){
        return `${_API_ENDPOINT.AGE}`;
    }
    static getBusinessLink(){
        return `${_API_ENDPOINT.BUSINESS}`;
    }
    static getQuestionLink(){
        return `${_API_ENDPOINT.QUESTION}`;
    }
    static getScoresLink(){
        return `${_API_ENDPOINT.SCORE}`;
    }
    static getIsAuthenticatedLink(){
        return `${_API_ENDPOINT.IS_AUTHENTICATED}`
    }
    static getLogoutLink(){
        return `${_API_ENDPOINT.LOGOUT}`
    }
    static getAnswerLink(){
        return `${_API_ENDPOINT.ANSWER}`
    }
    static getJWTAuthenticationTestLink(){
        return `${_API_ENDPOINT.JWT_AUTHENTICATION_TEST}`
    }
    static getUserScoreLink(){
        return `${_API_ENDPOINT.USER_SCORE}`
    }
}

export default ApiEndpoint;