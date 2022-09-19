import "./styles/home.sass";
import './styles/main.sass';
import './styles/header.sass';
import './styles/footer.sass';
import './styles/index.sass';
import './styles/login.sass';
import './styles/form.sass';
import './styles/register.sass';
import './styles/checkbox.css';
import './styles/loading.sass';
import './styles/profile_intro.sass';
import './styles/account/edit_profile.sass';
import './styles/account/change_password.sass';
import './styles/account/delete_password.sass';
import './styles/account/account_info.sass';
import './styles/account/account.sass';
import './styles/test/test.sass';   
import './styles/test/result.sass';
import './styles/range_bar.sass';
import './styles/gauge.sass';
import './styles/tabs.sass';
import './styles/statistics.sass';
import './styles/not_found_page.sass';
import './styles/registered-user-header.sass';
import './scripts/web-components/header.js';
import './scripts/web-components/registered-user-header.js'
import './scripts/web-components/footer.js';
import './scripts/web-components/templates/loading.js';

import RouteManager from "./scripts/globals/routes";
import WindowController from './scripts/utils/window-manager';
import UserHelpers from "./scripts/globals/user-helpers";
import RegisteredUserHeader from "./scripts/web-components/registered-user-header.js";
import HeaderElement from "./scripts/web-components/header.js";

let currentURL = ""

const defineHeader = () => {
    const headerElement = document.querySelector("header")
    headerElement.innerHTML = ""
    if (UserHelpers.isLogin()){
        headerElement.appendChild(new RegisteredUserHeader());
        return;    
    }
    headerElement.appendChild(new HeaderElement());
}

const defineBodyPage = () => {
    const bodyElement = document.querySelector('main');    
    const nextURLPage = WindowController.getURLStripParts()[0];
    if (currentURL !== nextURLPage){
        bodyElement.innerHTML = "";
        bodyElement.appendChild(RouteManager.getPage(nextURLPage));
    }
    currentURL = nextURLPage
};

window.addEventListener("hashchange", async() => {
    defineHeader();
    defineBodyPage();
})

window.addEventListener('DOMContentLoaded', async() => {
    defineHeader();
    defineBodyPage();
});