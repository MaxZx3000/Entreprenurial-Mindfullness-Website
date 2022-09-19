import Localization from "../utils/localization";

class HeaderElement extends HTMLElement{
    constructor(){
        super();
        this.headerElement = document.createElement('div');
    }
    connectedCallback(){
        this.render();
        this._setListeners();
        this.appendChildren();
    }
    render(){
        this._setHeaderElement();
    }
    _setHeaderElement(){
        this.headerElement.innerHTML = `
            <nav class="navbar fixed-top navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="#">
                    <img src = "./images/entreprenurial-mindfullness-logo.png" class = "website-logo">
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#home" data-i18n-key = "home">Home<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#login" data-i18n-key = "Login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#register" data-i18n-key = "Register">Register</a>
                        </li>
                        <li class = "nav-item">
                            <select name = "change-language" id = "change-language" class = "form-control" data-i18n-switcher class = "dropdown-menu" aria-labelledby = "navbarDropdownMenuLink">
                                <option value = "in" data-i18n-key = "indonesian">Indonesian</option>
                                <option value = "en" data-i18n-key = "english">English</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </nav>
        `;
    }
    _setListeners(){
        const changeLanguageElement = this.headerElement.querySelector("#change-language");
        changeLanguageElement.onchange = (e) => {
            console.log(e.target.value);
            Localization.changeLanguage(e.target.value);
            Localization.initTranslate();
        }
    }
    appendChildren(){
        this.appendChild(this.headerElement);
    }
}

customElements.define('header-element', HeaderElement);

export default HeaderElement;