import UserGlobal from "../../../globals/user-helpers";
import Localization from "../../../utils/localization";

class AccountInfoPage extends HTMLElement{
    constructor(){
        super();
        this.accountInfoElement = document.createElement("div");    
        this.userData = null
    }
    render(){
        
        this.accountInfoElement.innerHTML = `
            <div class = "container">
                <table>
                    <tr>
                        <td class = "left-table"><span class = "icon-small material-icons">person</span><label class = "profile-key" data-i18n-key = "username">Username</label></td>
                        <td class = "right-table"><label class = "profile-value">${this.userData.username}</label></td>
                    </tr>
                    <tr>
                        <td class = "left-table"><span class = "icon-small material-icons">badge</span><label class = "profile-key" data-i18n-key = "fullname">Fullname</label></td>
                        <td class = "right-table"><label class = "profile-value">${this.userData.fullname}</label></td>
                    </tr>
                    <tr>
                        <td class = "left-table"><span class = "icon-small material-icons">email</span><label class = "profile-key" data-i18n-key = "email">E-Mail Address</label></td>
                        <td class = "right-table"><label class = "profile-value">${this.userData.email}</label></td>
                    </tr>                    
                </table>
            </div>
        `;
    }
    async fetchUserData(){
        this.userData = await UserGlobal.getUserFullData()
    }
    appendChildren(){
        this.appendChild(this.accountInfoElement);
    }
    async connectedCallback(){
        Localization.initTranslate();
        await this.fetchUserData();
        this.render();
        this.appendChildren();
    }
}

customElements.define("account_info-page", AccountInfoPage);
export default AccountInfoPage;