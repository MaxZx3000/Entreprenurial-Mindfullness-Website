import Localization from "../../utils/localization";

class NotFoundPage extends HTMLElement{
    constructor(){
        super();
        this.headingElement = document.createElement('div');
    }
    render(){
        this.headingElement.innerHTML = `
            <div class = "container">
                <span id = "sad-face-icon" class = "material-icons material-symbols-outlined">
                    sentiment_very_dissatisfied
                </span>
                <h1 data-i18n-key = "page-not-found-title"></h1>
                <p data-i18n-key = "page-not-found-1"></p>
                <p data-i18n-key = "page-not-found-2"></p>
            </div>
        `;
    }
    connectedCallback(){
        this.render();
        this.appendChildren();
        Localization.initTranslate();
    }

    appendChildren(){
        this.appendChild(this.headingElement)
    }
}

customElements.define('not_found-page', NotFoundPage);

export default NotFoundPage