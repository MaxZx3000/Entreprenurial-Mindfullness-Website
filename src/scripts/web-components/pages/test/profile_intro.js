import UserGlobal from "../../../globals/user-helpers";
import Localization from "../../../utils/localization";

class ProfileIntroPage extends HTMLElement{
    constructor(){
        super();
        this.profileIntroElement = document.createElement("div");
    }

    async render(){
        const userData = await UserGlobal.getUserData()
        this.profileIntroElement.innerHTML = `
            <img alt = "Background Profile" id = "background-profile" src = "./images/forest.png" class = "background_image">
            <div class = "profile container">
                <img alt = "Profile Picture" src = "https://beeentmind-edutech.apps.binus.ac.id/api-em/images/profile_male.png" id = "profile-image">
                <hr>
                <div class = "container">
                    <h2>${userData.fullname}</h2>
                </div>
                <div class = "container">
                    <a class = "action-button" href = "#test/1" data-i18n-key = "take_test">Take the test</a>
                </div>
                <div class = "container">
                    <a class = "secondary-action-link" href = "#account/account-info" data-i18n-key = "edit_profile">Edit Profile</a>
                </div>
            </div>
        `;
    }

    async init(){
        await this.render();
        Localization.initTranslate();
        this.appendChildren();
    }

    appendChildren(){
        this.appendChild(this.profileIntroElement);
    }
}

customElements.define("profile_intro-page", ProfileIntroPage);

export default ProfileIntroPage;