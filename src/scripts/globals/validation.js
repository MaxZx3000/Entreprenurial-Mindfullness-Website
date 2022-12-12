import IsEmail from "isemail";
import { sprintf } from "sprintf-js";
import Localization from "../utils/localization";

class _Validation{
    constructor(){
        if (_Validation.instance == null){
            _Validation.instance = this
        }
        return _Validation.instance
    }
    validateUsername(value){
        var result = {}
        if (value.trim() === ""){
            result = {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("Username"),
                )
            }
        }
        else if (value.trim().length > 100){
            result = {
                'isTrue': false,
                "message": sprintf(
                    Localization.getLocalizedText("text_overflow"),
                    Localization.getLocalizedText("Username"),
                    100
                )
            }
        }
        else{
            result = {'isTrue': true}
        }
        return result
    }
    validatePassword(value){
        if (value.trim() === ""){
            return {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("Password")
                )
            }
        }
        else if (value.length > 30){
            return {
                'isTrue': false,
                "message": sprintf(
                    Localization.getLocalizedText("text_overflow"),
                    Localization.getLocalizedText("Password"),
                    30
                )
            }
        }
        return {'isTrue': true}
    }
    validateConfirmPassword(password1, password2){
        if (password1 !== password2){
            return {
                'isTrue': false,
                "message": sprintf(
                    Localization.getLocalizedText("not_same"),
                    Localization.getLocalizedText("Password"),
                    Localization.getLocalizedText("confirm_password")
                )
            }
        }
        return {'isTrue': true}
    }
    validateEmail(value){
        if (IsEmail.validate(value) === false){
            return {
                'isTrue': false,
                "message": sprintf(
                    Localization.getLocalizedText("not_format_email"),
                    Localization.getLocalizedText("e_mail_address"),
                )
            }
        }
        return {'isTrue': true}
    }
    validateFullname(value){
        if (value.trim() === ""){
            return {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("fullname")
                )
            }
        }
        return {'isTrue': true}
    }
    validateGender(value){
        if(value.trim() === ""){
            return {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("gender")
                )
            }
        }
        return {'isTrue': true}
    }
    validateCity(value){
        if (value.trim() === ""){
            return {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("country")
                )
            }
        }
        return {'isTrue': true}
    }
    validateProvince(value){
        if (value.trim() === ""){
            return {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("province")
                )
            }
        }
        return {'isTrue': true}
    }
    validateAge(value){
        if (value.trim() === ""){
            return {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("country")
                )
            }
        }
        return {'isTrue': true}
    }
    validateBusinessType(value){
        if (value.trim() === ""){
            return {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("type_of_business")
                )
            }
        }
        return {'isTrue': true}
    }
    validateStatus(value){
        if (value.trim() === ""){
            return {
                'isTrue': false, 
                "message": sprintf(
                    Localization.getLocalizedText("is_empty"),
                    Localization.getLocalizedText("status")
                )
            }
        }
        return {'isTrue': true}
    }
}

const Validation = new _Validation()
Object.freeze(Validation)
export default Validation;