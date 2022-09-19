import Polyglot from "node-polyglot";

class _Localization{
    constructor(){
        if (_Localization.instance == null){
            this.defaultLocale = "in";
            this.polyglot = new Polyglot()
            _Localization.instance = this
        }
        return _Localization.instance;
    }
    async _loadTransactions(locale){
        return await fetch(`/lang/${locale}.json`).then(
            (response) => response.json()
        );
    }
    _translatePage(){
        const translatableElements = document.querySelectorAll("[data-i18n-key]");
        translatableElements.forEach( 
            (element) => {
                const key = element.getAttribute("data-i18n-key");
                element.innerHTML = this.polyglot.t(key);
            }
        )
    }
    changeLanguage(newLocale){
        this.defaultLocale = newLocale;
        this.initTranslate();
    }
    async initTranslate(){
        const translations = await this._loadTransactions(
            this.defaultLocale,
        );
        this.polyglot.replace(translations);
        this._translatePage();
    }
    getLocalizedText(key){
        return this.polyglot.t(key);
    }
}
const Localization = new _Localization();
export default Localization;