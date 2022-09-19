class ForgotPasswordPage extends HTMLElement{
    constructor(){
        super();
        this.forgotPasswordElement = document.createElement("div");
    }
    render(){   
        this.forgotPasswordElement.innerHTML = `
            <h1>Forgot Password</h1>
            <div class = "container">
                <p class 
            </div>
        `;
    }
    appendChildren(){

    }
}

customElements.define("forgot-password", ForgotPasswordPage);
export default ForgotPasswordPage