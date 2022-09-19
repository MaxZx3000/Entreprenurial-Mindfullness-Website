import Swal from "sweetalert2";

class SwalCustomFunctions{
    static initializeCloseButton(closeButtonSwalId = "swal-close-button"){
        const swalWindowElement = document.querySelector(".swal2-container");
        const swalCloseButton = swalWindowElement.querySelector(`#${closeButtonSwalId}`);
        swalCloseButton.addEventListener("click", () => {
            console.log("Close!");
            Swal.clickConfirm();
        });
    }
    static initializeCustomFunctionOKButton(customFunction, okSwalButtonId = "swal-close-button"){
        const swalWindowElement = document.querySelector(".swal2-container");
        const swalCloseButton = swalWindowElement.querySelector(`#${okSwalButtonId}`);
        swalCloseButton.addEventListener("click", customFunction)
    }
}



export default SwalCustomFunctions;