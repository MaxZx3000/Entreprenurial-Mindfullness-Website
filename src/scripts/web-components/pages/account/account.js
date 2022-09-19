import Localization from "../../../utils/localization";
import WindowController from "../../../utils/window-manager";
import AccountInfoPage from "./account_info";
import ChangePasswordPage from "./change_password";
import DeleteAccountPage from "./delete_account";
import EditProfilePage from "./edit_profile";

class AccountPage extends HTMLElement{
    constructor(){
        super();
        this.accountElement = document.createElement("div");
    }
    
    render(){
        this.accountElement.innerHTML = `
            <div class = "h1-header">
                <h1>Your Account</h1>
            </div>
            <div class = "container">
                <div class = "nav nav-tabs">
                    <li class = "nav-item">
                        <a class = "nav-link active" href = "#account/account-info" id = "account-info-link">
                            <span class="material-icons material-symbols-outlined">
                                account_circle
                            </span>
                            <span class = "nav-title">Account Info</span>
                        </a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link" href = "#account/edit-profile" id = "edit-profile-link">
                            <span class="material-icons material-symbols-outlined">
                                edit
                            </span>
                            <span class = "nav-title">Edit Profile</span>
                        </a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link" href = "#account/password" id = "password-link">
                            <span class="material-icons material-symbols-outlined">
                                key
                            </span>
                            <span class = "nav-title">Password</span>
                        </a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link" href = "#account/delete-account" id = "delete-account-link">
                            <span class="material-icons material-symbols-outlined">
                                delete_forever
                            </span>
                            <span class = "nav-title">Delete Account</span>
                        </a>
                    </li>
                </div>
                <div id = "subpage">

                </div>
            </div>
        `;
    }

    addListeners(){
        window.addEventListener("hashchange", (event) => {
            this.initializeChangePage();
        });
    }
    initializeChangePage(){
        const currentURL = WindowController.getURLStripParts()[1];
        console.log(currentURL);

        const subpageElement = this.accountElement.querySelector("#subpage");
        subpageElement.innerHTML = "";
        
        const accountInfoLink = this.accountElement.querySelector("#account-info-link");
        const editProfileLink = this.accountElement.querySelector("#edit-profile-link");
        const deleteAccountLink = this.accountElement.querySelector("#delete-account-link");
        const passwordLink = this.accountElement.querySelector("#password-link");

        if (currentURL === "account-info"){
            accountInfoLink.className = "nav-link active";
            editProfileLink.className = "nav-link";
            deleteAccountLink.className = "nav-link";
            passwordLink.className = "nav-link";
            subpageElement.appendChild(new AccountInfoPage());
        }
        else if (currentURL === "edit-profile"){
            accountInfoLink.className = "nav-link";
            editProfileLink.className = "nav-link active";
            deleteAccountLink.className = "nav-link";
            passwordLink.className = "nav-link";
            subpageElement.appendChild(new EditProfilePage());
        }
        else if (currentURL === "password"){
            accountInfoLink.className = "nav-link";
            editProfileLink.className = "nav-link";
            passwordLink.className = "nav-link active";
            deleteAccountLink.className = "nav-link";
            subpageElement.appendChild(new ChangePasswordPage());
        }
        else if (currentURL === "delete-account"){
            accountInfoLink.className = "nav-link";
            editProfileLink.className = "nav-link";
            passwordLink.className = "nav-link";
            deleteAccountLink.className = "nav-link active";
            subpageElement.appendChild(new DeleteAccountPage());
        }
    }
    appendChildren(){
        this.appendChild(this.accountElement);
    }
    connectedCallback(){
        this.render();
        this.initializeChangePage();
        this.addListeners();
        Localization.initTranslate();
        this.appendChildren();
    }
   
}
customElements.define("account-page", AccountPage);
export default AccountPage;