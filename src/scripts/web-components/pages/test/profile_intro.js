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
            <img id = "background-profile" src = "https://img.freepik.com/free-vector/alone-concept-illustration_114360-2393.jpg?t=st=1652167671~exp=1652168271~hmac=1ec930ffe4c6e31e560abe966f0c7c0835dbc7be6c7dab05236b0d445e8617b0&w=740" class = "background_image">
            <div class = "profile container">
                <img src = "https://upload.wikimedia.org/wikipedia/commons/6/67/Vector_Face_wearing_Spectacles.png" id = "profile-image">
                <hr>
                <div class = "container">
                    <h2>${userData.fullname} (${userData.username})</h2>
                </div>
                <div class = "container">
                    <a class = "action-button" href = "#test/1" data-i18n-key = "take_test">Take the test</a>
                </div>
                <div class = "container">
                    <a class = "secondary-action-button" href = "#account/account-info" data-i18n-key = "edit_profile">Edit Profile</a>
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