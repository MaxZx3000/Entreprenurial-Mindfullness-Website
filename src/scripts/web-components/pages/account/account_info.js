import UserGlobal from "../../../globals/user-helpers";
import Localization from "../../../utils/localization";

class AccountInfoPage extends HTMLElement{
    constructor(){
        super();
        this.accountInfoElement = document.createElement("div");    
        // this.userData = null
    }
    render(){
        this.accountInfoElement.innerHTML = `
            <div class = "container">
                <table>
                    <tr>
                        <td class = "left-table"><span class = "icon-small material-icons">badge</span><label class = "profile-key" data-i18n-key = "fullname"></label></td>
                        <td class = "right-table"><label class = "profile-value" id = "fullname-label"></label></td>
                    </tr>
                    <tr>
                        <td class = "left-table"><span class = "icon-small material-icons">email</span><label class = "profile-key" data-i18n-key = "email"></label></td>
                        <td class = "right-table"><label class = "profile-value" id = "email-label"></label></td>
                    </tr>                    
                </table>
            </div>
        `;
    }
    async fetchUserData(){
        const userData = await UserGlobal.getUserData()
        const fullnameLabelElement = this.accountInfoElement.querySelector("#fullname-label");
        const emailLabelElement = this.accountInfoElement.querySelector("#email-label");
        fullnameLabelElement.innerText = userData.fullname;
        emailLabelElement.innerText = userData.email;
    }
    appendChildren(){
        this.appendChild(this.accountInfoElement);
    }
    async init(){
        this.render();
        this.fetchUserData();
        this.appendChildren();
    }
}

customElements.define("account_info-page", AccountInfoPage);
export default AccountInfoPage;