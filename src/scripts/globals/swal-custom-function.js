import Swal from "sweetalert2";
import Localization from "../utils/localization";

class SwalCustomFunctions{
    static initializeCloseButton(closeButtonSwalId = "swal-close-button"){
        const swalWindowElement = document.querySelector(".swal2-container");
        const swalCloseButton = swalWindowElement.querySelector(`#${closeButtonSwalId}`);
        swalCloseButton.addEventListener("click", () => {
            Swal.clickConfirm();
        });
    }
    static initializeCustomFunctionOKButton(customFunction, okSwalButtonId = "swal-close-button"){
        const swalWindowElement = document.querySelector(".swal2-container");
        const swalCloseButton = swalWindowElement.querySelector(`#${okSwalButtonId}`);
        swalCloseButton.addEventListener("click", customFunction)
    }
    static initializeLoadingPopUp(){
        Swal.fire({
            title: Localization.getLocalizedText("processing"),
            showConfirmButton: false,
            showCloseButton: false,
            showDenyButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }            
        });
    }
}



export default SwalCustomFunctions;