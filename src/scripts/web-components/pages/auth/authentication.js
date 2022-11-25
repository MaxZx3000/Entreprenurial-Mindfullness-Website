import Swal from "sweetalert2";
import SwalCustomFunctions from "../../../globals/swal-custom-function";
import MyFetch from "../../../globals/my-fetch";
import UserGlobal from "../../../globals/user-helpers";
import WindowController from "../../../utils/window-manager";
import Localization from "../../../utils/localization";

class AuthenticationPage extends HTMLElement{
    constructor(){
        super();
        this.authenticationElement = document.createElement("div");
    }
    render(){
        this.authenticationElement.innerHTML = `
            <div class = "h1-header">
                <h1 data-i18n-key = "authentication"></h1>
            </div>
            <div class = "container">
                <br>
                <img id = "authentication-image" src = "./images/Compressed/steps/sign_up_compressed.png">
                <br>
                <br>
                <p data-i18n-key = "authentication_fill_in">You must fill in authentication code to continue using your application!</p>
                <p data-i18n-key = "email_check_auth">Please check your email to check your authentication code and enter 4 digit of authentication code.</p>
                <div class = "form-group">
                    <input type = "text" class = "form-control" id = "authentication-code" name = "authentication-code" maxlength = "4">
                </div>
                <div class = "form-group">
                    <button type = "button" id = "authentication-check-button" class = "action-button" data-i18n-key = "authenticate_account"></button>
                </div>
            </div>
        `;
    }
    addAuthenticationCheckListener(){
        const authenticationCheckButtonElement = this.authenticationElement.querySelector("#authentication-check-button");
        authenticationCheckButtonElement.addEventListener("click", async () => {
            const inputtedOTP = this.authenticationElement.querySelector("#authentication-code").value;
            
            SwalCustomFunctions.initializeLoadingPopUp();
            const userData = UserGlobal.getUserData();

            const responseJSON = await MyFetch.authenticateUser(userData.email, inputtedOTP)
            
            if (responseJSON.status === 200){
                userData.verified = true
                UserGlobal.saveUserData(userData)
                Swal.fire({
                    title: Localization.getLocalizedText("authentication_success"),
                    icon: "success",
                    showConfirmButton: false,
                    showDenyButton: false,
                    showCloseButton: false,
                    allowOutsideClick: false,
                    html: `
                        <p>${Localization.getLocalizedText("authentication_success_message")}</p>
                        <button type = "button" class = "action-button" name = "ok" id = "back-to-home-button" style = "width: 100%">OK</button>
                    `
                });
                const backToHomeButton = document.querySelector("#back-to-home-button");
                backToHomeButton.addEventListener("click", () => {
                    WindowController.setWindowURLHash("profile_intro");
                    WindowController.reloadPage();
                    Swal.close();
                });
            }
            else if (responseJSON.status === 400){
                Swal.fire({
                    title: Localization.getLocalizedText("authentication_failed"),
                    icon: "error",
                    showConfirmButton: false,
                    showDenyButton: false,
                    html: `
                        <p>${Localization.getLocalizedText("otp_key_invalid")}</p>
                        <button type = "button" id = "swal-close-button" class = "action-button" name = "ok" style = "width: 100%">OK</button>
                    `
                });
            }
            else if (responseJSON.status === 401){
                Swal.fire({
                    title: Localization.getLocalizedText("authentication_failed"),
                    icon: "error",
                    showConfirmButton: false,
                    showDenyButton: false,
                    html: `
                        <p>${Localization.getLocalizedText("otp_length_mismatch")}</p>
                        <button type = "button" id = "swal-close-button" class = "action-button" name = "ok" style = "width: 100%">OK</button>
                    `
                })
            }
            else if (responseJSON.status === 402){
                Swal.fire({
                    title: Localization.getLocalizedText("authentication_failed"),
                    icon: "error",
                    showConfirmButton: false,
                    showDenyButton: false,
                    html: `
                        <p>${Localization.getLocalizedText("invalid_secret_key")}</p>
                        <button type = "button" id = "swal-close-button" class = "action-button" name = "ok" style = "width: 100%">OK</button>
                    `
                })
            }
            else{
                Swal.fire({
                    title: Localization.getLocalizedText("authentication_failed"),
                    icon: "error",
                    showConfirmButton: false,
                    showDenyButton: false,
                    html: `
                        <p>${Localization.getLocalizedText("unknown_error_occured")}</p>
                        <button type = "button" id = "swal-close-button" class = "action-button" name = "ok" style = "width: 100%">OK</button>
                    `
                })
            }
            SwalCustomFunctions.initializeCloseButton();
        });
    }
    async init(){
        this.render();
        this.addAuthenticationCheckListener();
        this.appendChildren();
    }
    appendChildren(){
        this.appendChild(this.authenticationElement)
    }
}

customElements.define("authentication-page", AuthenticationPage);
export default AuthenticationPage