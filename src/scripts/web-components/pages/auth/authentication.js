import Swal from "sweetalert2";
import SwalCustomFunctions from "../../../globals/swal-custom-function";
import MyFetch from "../../../globals/my-fetch";
import UserGlobal from "../../../globals/user-helpers";
import WindowController from "../../../utils/window-manager";

class AuthenticationPage extends HTMLElement{
    constructor(){
        super();
        this.authenticationElement = document.createElement("div");
    }
    render(){
        this.authenticationElement.innerHTML = `
            <div class = "h1-header">
                <h1 data-i18n-key = "authentication">Authentication</h1>
            </div>
            <div class = "container">
                <span class = "material-icons material-symbols-outlined" id = "authentication-key">
                    key
                </span>
                <p>You must fill in authentication code to continue using your application!</p>
                <p>Please check your email to check your authentication code and enter 4 digit of authentication code.</p>
                <div class = "form-group">
                    <input type = "text" class = "form-control" id = "authentication-code" name = "authentication-code" maxlength = "4">
                </div>
                <div class = "form-group">
                    <button type = "button" id = "authentication-check-button" class = "action-button" data-i18n-key = "authentication-check">Cek Autentikasi</button>
                </div>
            </div>
        `;
    }
    addAuthenticationCheckListener(){
        const authenticationCheckButtonElement = this.authenticationElement.querySelector("#authentication-check-button");
        authenticationCheckButtonElement.addEventListener("click", async () => {
            const userOTP = UserGlobal.getOTP();
            const inputtedOTP = this.authenticationElement.querySelector("#authentication-code").value;
            
            console.log(userOTP)
            console.log(inputtedOTP)

            if (userOTP !== inputtedOTP){
                Swal.fire({
                    title: "Oops!",
                    icon: 'error',
                    html: `
                        <p>Your OTP password is incorrect!</p>
                        <p>Please try again!</p>
                    `
                });
                return
            }
            // const authenticationCodeInputElement = this.authenticationElement.querySelector("#authentication-code");
            // const authenticationCodeValue = authenticationCodeInputElement.value;
            SwalCustomFunctions.initializeLoadingPopUp();
            const userData = UserGlobal.getUserData();

            const responseJSON = await MyFetch.authenticateUser(userData.email)
            
            if (responseJSON.status === 200){
                userData.verified = true
                UserGlobal.saveUserData(userData)
                Swal.fire({
                    title: "Authentication Success!",
                    icon: "success",
                    showConfirmButton: false,
                    showDenyButton: false,
                    showCloseButton: false,
                    allowOutsideClick: false,
                    html: `
                        <p>Now you can use this app! Enjoy :)</p>
                        <button type = "button" class = "action-button" name = "ok" id = "back-to-home-button">OK</button>
                    `
                });
                const backToHomeButton = document.querySelector("#back-to-home-button");
                backToHomeButton.addEventListener("click", () => {
                    WindowController.setWindowURLHash("profile_intro");
                    WindowController.reloadPage();
                    Swal.close();
                });
            }
            else if (responseJSON.status === 402){
                Swal.fire({
                    title: "Authentication Failed!",
                    icon: "error",
                    showConfirmButton: false,
                    showDenyButton: false,
                    html: `
                        <p>Wrong authentication code!</p>
                        <button type = "button" class = "action-button" name = "ok">OK</button>
                    `
                });
            }
            SwalCustomFunctions.initializeCloseButton();
        });
    }
    // addSendAuthenticationListener(){
    //     const sendAuthenticationButtonElement = this.authenticationElement.querySelector("#send-authentication-button");
    //     sendAuthenticationButtonElement.addEventListener("click", async () => {
    //         SwalCustomFunctions.initializeLoadingPopUp();
    //         const userData = UserGlobal.getUserData()
    //         const responseBody = await MyFetch.sendEmailAuthentication(userData.email);
    //         if (responseBody.status === 200){
    //             Swal.fire({
    //                 title: "Authentication Success!",
    //                 icon: "success",
    //                 showConfirmButton: false,
    //                 showDenyButton: false,
    //                 html: `
    //                     <p>Now you can use this app! Enjoy :)</p>
    //                     <button type = "button" class = "action-button" name = "ok">OK</button>
    //                 `
    //             });
    //             SwalCustomFunctions.initializeCloseButton();
    //         }
    //     });
    // }
    async init(){
        this.render();
        this.addAuthenticationCheckListener();
        // this.addSendAuthenticationListener();
        this.appendChildren();
    }
    appendChildren(){
        this.appendChild(this.authenticationElement)
    }
}

customElements.define("authentication-page", AuthenticationPage);
export default AuthenticationPage