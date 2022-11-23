class HTMLHelpers{
    static makeInvalidStatusField(parentElement, validationResult, isNextElementSibling = true){
        const errorInputElement = parentElement.querySelector(validationResult.element)
        let errorMessageElement = null
        if (isNextElementSibling){
            errorMessageElement = errorInputElement.nextElementSibling
        }
        else{
            errorMessageElement = errorInputElement
        }
        errorInputElement.className = "form-control is-invalid"
        errorMessageElement.className = "invalid-feedback d-block"
        errorMessageElement.innerText = validationResult.message
    }
    static makeRegularStatusField(parentElement, element){
        const errorInputElement = parentElement.querySelector(element)
        const errorMessageElement = errorInputElement.nextElementSibling
        errorInputElement.className = "form-control"
        errorMessageElement.className = "invalid-feedback"
    }
    static makeOKStatusField(parentElement, element){
        const errorInputElement = parentElement.querySelector(element)
        const errorMessageElement = errorInputElement.nextElementSibling
        errorInputElement.className = "form-control is-valid"
        errorMessageElement.className = "valid-feedback"
    }
}

export default HTMLHelpers