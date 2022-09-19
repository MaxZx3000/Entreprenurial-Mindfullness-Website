class FooterElement extends HTMLElement{
    constructor(){
        super();
        this.footerElement = document.createElement('div');
    }
    _setCopyrightFooterElement(){
        this.footerElement.className = "row footer-grid";
        this.footerElement.id = "border-top-footer"
        this.footerElement.innerHTML = `
            <div class = "col-sm-6">
                <img src = "./images/entreprenurial-mindfullness-logo.png" class = "website-logo">
            </div>
            <div class = "col-sm-6">
                <h3 data-i18n-key = "powered_by">Powered by Bina Nusantara University</h2>
                <p>Jl. K.H. Syahdan No. 9, Palmerah, West Jakarta, DKI Jakarta, Indonesia</p>
                <p data-i18n-key = "have_any_questions">Have any questions? Email us at </p>
            </div>
        `;
    }
    
    render(){
        this._setCopyrightFooterElement();
    }

    connectedCallback(){
        this.render();
        this.appendChildren();
    }
    appendChildren(){
        this.appendChild(this.footerElement);
    }
}

customElements.define('footer-element', FooterElement);

export default FooterElement;