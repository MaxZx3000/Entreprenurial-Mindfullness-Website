import Swal from "sweetalert2";
import StorageHelpers from "../globals/storage-helpers";
import Localization from "../utils/localization";
import WindowController from "../utils/window-manager";
import SwalCustomFunctions from "../globals/swal-custom-function";

class RegisteredUserHeader extends HTMLElement{
    constructor(){
        super();
        this.registeredUserHeaderElement = document.createElement('div');
    }
    _setHeaderElement(){
        this.registeredUserHeaderElement.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a class="navbar-brand" href="#home">
                     <img src = "./images/entreprenurial-mindfullness-logo.png" class = "website-logo">
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <select name = "change-language" id = "change-language" class = "form-control" data-i18n-switcher class = "dropdown-menu" aria-labelledby = "navbarDropdownMenuLink">
                                <option value = "in" data-i18n-key = "indonesian">Indonesian</option>
                                <option value = "en" data-i18n-key = "english">English</option>
                            </select>
                        </li>
                        
                    </ul>
                    <form class="form-inline my-2 my-lg-0 dropdown">
                        <!-- <li class="nav-item active"> -->
                            <a class="nav-link" href="#profile_intro" data-i18n-key = "profile">Profile</a>
                            <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                        <!-- </li> -->
                        <!-- <li class="nav-item dropdown"> -->
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img id = "profile-menu" src = "https://upload.wikimedia.org/wikipedia/commons/6/67/Vector_Face_wearing_Spectacles.png" class = "nav-link dropdown-toggle" id = "profile-image" role = "button" data-toggle = "dropdown" aria-haspopup = "true" aria-expanded = "false">
                            </a>
                            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="navbarDropdown">
                                <a class="nav-link" href = "#account/account-info" data-i18n-key = "profile_config">Edit Profile</a>
                                <a class="nav-link" href = "#result" data-i18n-key = "result">Result</a>
                                <button id = "logout-button" class="nav-link" data-i18n-key = "logout">Logout</button>
                            </div>
                        <!-- </li> -->
                    </form>
                </div>
            </nav>
        `;
    }
    _setLanguageListener(){
        const changeLanguageElement = this.registeredUserHeaderElement.querySelector("#change-language");
        changeLanguageElement.onchange = (e) => {
            Localization.changeLanguage(e.target.value);
            Localization.initTranslate();
        }
    }
    _setLogoutListener(){
        const logoutButtonElement = this.registeredUserHeaderElement.querySelector("#logout-button");
        logoutButtonElement.addEventListener("click", () => {
            StorageHelpers.deleteJWTToken();
            Swal.fire({
                icon: "success",
                title: Localization.getLocalizedText("logout"),
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
                html: `
                    <p data-i18n-key = "logout_success">${Localization.getLocalizedText("logout_success")}</p>
                    <button type = "button" id = "swal-close-button" class = "action-button" id = "forgot-password" style = "width: 100%">OK</button>
                `
            });
            SwalCustomFunctions.initializeCloseButton();
            WindowController.setWindowURLHash('login');
        });
    }
    _setListeners(){
        this._setLanguageListener()
        this._setLogoutListener()
    }
    render(){
        this._setHeaderElement();
    }
    connectedCallback(){
        this.render();
        this._setListeners();
        this.appendChildren();
    }
    appendChildren(){
        this.appendChild(this.registeredUserHeaderElement);
    }
}

customElements.define('registered_user_header-element', RegisteredUserHeader);

export default RegisteredUserHeader;