class LoadingElement extends HTMLElement{
    constructor(){
        super();
        this.loadingElement = document.createElement("div");
        this.message = "Loading...";
    }
    setMessage(message){
        this.message = message;
    }
    render(){
        this.loadingElement.innerHTML = `
            <div id = "loading-container">
                <div class="lds-ripple">
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <p id = "message">${this.message}</p>
        `;
    }
    appendChildren(){
        this.appendChild(this.loadingElement);
    }
    connectedCallback(){
        this.render();
        this.appendChildren();
    }
}

customElements.define('loading-element', LoadingElement);
export default LoadingElement;