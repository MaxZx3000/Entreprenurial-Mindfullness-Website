import HomePage from "../web-components/pages/home/home.js";
import LoginPage from "../web-components/pages/login.js";
import NotFoundPage from "../web-components/pages/not_found_page.js";
import ProfileIntroPage from "../web-components/pages/test/profile_intro.js";
import RegisterPage from "../web-components/pages/register.js";
import TestPage from "../web-components/pages/test/test.js";
import ResultPage from "../web-components/pages/test/result.js";
import AccountPage from "../web-components/pages/account/account.js";
import StatisticsPage from "../web-components/pages/statistics.js";
import UserHelpers from "./user-helpers.js";
import HistoryPage from "../web-components/pages/test/history.js";
import AuthenticationPage from "../web-components/pages/auth/authentication.js";
import VideoIntervensiPage from "../web-components/pages/home/video_intervensi.js";

class Routes {
  constructor() {
    if (Routes.instance == null) {
      Routes.instance = this;
    }
    return Routes.instance;
  }
  getPage(url) {
    if (url === 'home'){
      return new HomePage();
    }
    else if (url === "statistics"){
      return new StatisticsPage();
    }
    // For Non Registered User.
    if (UserHelpers.getJWTToken() === null){
      if (url === 'register'){
        return new RegisterPage();
      }
      else if (url === 'login'){
        return new LoginPage();
      }
    }
    // For Registered User.
    if (UserHelpers.getJWTToken() !== null){
      if (UserHelpers.getIsAuthenticated() === false){
        return new AuthenticationPage();
      }
      if (url === "account"){
        return new AccountPage();
      }
      else if (url === "test"){
        return new TestPage();
      }
      else if (url.startsWith("result?")){
        return new ResultPage();
      }
      else if (url === "profile_intro"){
        return new ProfileIntroPage();
      }
      else if (url === "history"){
        return new HistoryPage();
      }
      else if (url === "video_intervensi"){
        return new VideoIntervensiPage();
      }
      // else if (url === "authenticate"){
      //   return new AuthenticationPage();
      // }
    }
    return new NotFoundPage();
  }
}
const RouteManager = new Routes();
Object.freeze(RouteManager);
export default RouteManager;