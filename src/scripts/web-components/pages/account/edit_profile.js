import Swal from "sweetalert2";
import ApiEndpoint from "../../../globals/api-endpoint";
import HTMLHelpers from "../../../globals/htnl-helpers";
import MyFetch from "../../../globals/my-fetch";
import SwalCustomFunctions from "../../../globals/swal-custom-function";
import UserGlobal from "../../../globals/user-helpers";
import Validation from "../../../globals/validation";
import FetchHelpers from "../../../utils/fetch-helpers";
import Localization from "../../../utils/localization";

class EditProfilePage extends HTMLElement{
    constructor(){
        super();
        this.editProfileElement = document.createElement('div');
    }
    render(){
        this.editProfileElement.innerHTML = `
            <img id = "background-profile" src = "https://img.freepik.com/free-vector/alone-concept-illustration_114360-2393.jpg?t=st=1652167671~exp=1652168271~hmac=1ec930ffe4c6e31e560abe966f0c7c0835dbc7be6c7dab05236b0d445e8617b0&w=740" class = "background_image">
            <div class = "container">                
                <form>
                    <div class = "image-container">
                        <img id = 'profile-picture' src = "https://upload.wikimedia.org/wikipedia/commons/6/67/Vector_Face_wearing_Spectacles.png" id = "profile-image">
                        <!-- <button type = "file" class = "icon-button" id = "edit-picture">
                            <span class="material-icons material-symbols-outlined">edit</span>
                        </button> -->
                    </div>
                    <div class = "form-group">
                        <label for = "fullname" data-i18n-key = "fullname">Full name</label>
                        <input type = "text"  class = "form-control" id = "fullname" name = "fullname">
                        <div class="invalid-feedback">
                        </div>
                    </div>
                    <div class = "form-group">
                        <label data-i18n-key = "gender">Gender</label>
                        <br>
                        <input type="radio" id="male" name="gender" value="Male">
                        <label for="male" data-i18n-key = "male">Male</label>
                        <input type="radio" id="female" name="gender" value="Female">
                        <label for="female" data-i18n-key = "female">Female</label>
                        <div class="invalid-feedback">
                        </div>
                    </div>
                    <div class = "form-group">
                        <label for = "country_id" data-i18n-key = "country">Country</label>
                        <select type = "text"  class = "form-control" id = "country_id" name = "country_id"></select>
                        <div class="invalid-feedback">
                        </div>
                    </div>
                    <div class = "form-group">
                        <label for = "province_id" data-i18n-key = "province">Province</label>
                        <select type = "text"  class = "form-control" id = "province_id" name = "province_id"></select>
                        <div class="invalid-feedback">
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm">
                            <div class = "form-group">
                                <label for = "age" data-i18n-key = "age">Age</label>
                                <select type = "text"  class = "form-control" id = "age_id" name = "age_id"></select>
                                <div class="invalid-feedback">
                                </div>
                            </div>
                            <div class = "form-group">
                                <label for = "status" data-i18n-key = "status">Status</label>
                                <select type = "text"  class = "form-control" id = "status_id" name = "status_id"></select>
                                <div class="invalid-feedback">
                                </div>
                            </div>
                        </div>
                        <div class = "col-sm">
                            <div class = "form-group">
                                <label for = "type_of_business" data-i18n-key = "type_of_business">Type of Business</label>
                                <select class = "form-control" id = "business_id" name = "business_id"></select>
                                <div class="invalid-feedback">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class = "form-group">
                        <button type = "button" id = "register-button" class = "action-button">Update Profile</button>
                    </div>
                </form>
            </div>
        `;
    }
    async addProvincesOptionElement(){
        const provinceJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getProvinceAllLink(),
            FetchHelpers.getDefaultRequestBody(),
        )
        if (provinceJSON.status === 200){
            const provinces = provinceJSON.json;
            const selectProvincesElement = this.editProfileElement.querySelector("#province_id");
            provinces.forEach((province) => {
                const optionElement = document.createElement("option")
                optionElement.innerText = province.name
                optionElement.value = province.id
                selectProvincesElement.appendChild(optionElement)
            });
        }
    }
    async addCountriesOptionElement(){
        const countryJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getCountryLink(),
            FetchHelpers.getDefaultRequestBody()
        )
        if (countryJSON.status === 200){
            const countries = countryJSON.json;
            const selectCountriesElement = this.editProfileElement.querySelector("#country_id");
            countries.forEach((country) => {
                const optionElement = document.createElement("option")
                optionElement.innerText = country.name
                optionElement.value = country.id
                selectCountriesElement.appendChild(optionElement)
            });
        }
    }

    async addStatusesOptionElement(){
        const statusJSON = await MyFetch.getStatusData()
        if (statusJSON.status === 200){
            const statuses = statusJSON.json
            const selectCountriesElement = this.editProfileElement.querySelector("#status_id");
            statuses.forEach((status) => {
                const optionElement = document.createElement("option");
                optionElement.innerText = status.status
                optionElement.value = status.id
                selectCountriesElement.appendChild(optionElement)
            })
        }
    }
    async addAgesOptionElement(){
        const ageJSON = await MyFetch.getAgeData()
        if (ageJSON.status === 200){
            const ages = ageJSON.json
            const selectAgeElement = this.editProfileElement.querySelector("#age_id");
            ages.forEach((age) => {
                const optionElement = document.createElement("option")
                optionElement.innerText = age.age
                optionElement.value = age.id
                selectAgeElement.appendChild(optionElement)
            })
        } 
    }
    async addBusinessesOptionElement(){
        const businessJSON = await MyFetch.getBusinessData()
        if (businessJSON.status === 200){
            const businesses = businessJSON.json
            const selectBusinessElement = this.editProfileElement.querySelector("#business_id");
            businesses.forEach((business) => {
                const optionElement = document.createElement("option")
                optionElement.innerText = business.business
                optionElement.value = business.id
                selectBusinessElement.appendChild(optionElement)
            })
        } 
    }
    async performRequest(jsonRequestData){
        const responseJSONData = await MyFetch.editProfile(jsonRequestData)
        if (responseJSONData.status === 200){
            Swal.fire({
                title: "Hooray!",
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                showDenyButton: false,
                html: `
                    <p>${responseJSONData.json.message}</p>
                    <button type = "button" id = "swal-close-button" class = "action-button" id = "forgot-password" style = "width: 100%">OK</button>
                
                `
            })
            SwalCustomFunctions.initializeCloseButton()
        }
        else if (responseJSONData.status === 401){
            console.log(responseJSONData.json)
            Swal.fire({
                title: "Oops!",
                icon: 'error',
                showCancelButton: false,
                showCloseButton: false,
                showDenyButton: false,
                html: `
                    <p>${responseJSONData.json.message}</p>
                    <button type = "button"id = "swal-close-button"  class = "action-button"></button>`
            })
            SwalCustomFunctions.initializeCloseButton()
        }
    }
    validateForm(json){
        if (Validation.validateFullname(json.fullname).isTrue === false){
            const validation = Validation.validateFullname(json.fullname)
            validation.element = "#fullname"
            return validation
        }
        else if (Validation.validateCity(json.country_id).isTrue === false){
            const validation = Validation.validateCity(json.country_id)
            validation.element = "#country_id"
            return validation
        }
        else if (Validation.validateProvince(json.status_id).isTrue === false){
            const validation = Validation.validateProvince(json.status_id)
            validation.element = "#status_id"
            return validation
        }
        else if (Validation.validateAge(json.age_id).isTrue === false){
            const validation = Validation.validateAge(json.age_id)
            validation.element = "#age_id"
            return validation
        }
        else if (Validation.validateBusinessType(json.business_id).isTrue === false){
            const validation = Validation.validateBusinessType(json.business_id)
            validation.element = "#business_id"
            return validation
        }
        else{
            return {'isTrue': true, "element": null}
        }
    }
    setListeners(){
        const inputElements = this.editProfileElement.querySelectorAll("input[type='text'], select, .radio-group");

        inputElements.forEach(element => {
            element.addEventListener("input", () => {
                HTMLHelpers.makeRegularStatusField(this.editProfileElement, `#${element.id}`);
            })
        });   

        // const editPictureElement = this.editProfileElement.querySelector("#edit-picture")
        // editPictureElement.addEventListener("click", () => {
        //     Swal.fire({
        //         title: "Upload Image",
        //         showCloseButton: false,
        //         showConfirmButton: false,
        //         showDenyButton: false,
        //         html: `
        //             <input type = "file" id = "image-file-picker">
        //             <button type = "button" id = "swal-confirm-button" class = "action-button" style = "width: 100%">OK</button>
        //             <div class = "invalid-feedback">
                        
        //             </div>
        //         `
        //     })
        //     const imageConfirmElement = document.querySelector("#swal-confirm-button")
        //     imageConfirmElement.addEventListener("click", () => {
        //         const imageInputElement = document.querySelector("#image-file-picker")
        //         const [file] = imageInputElement.files
        //         if (file) {
        //             const imagePreviewElement = this.editProfileElement.querySelector("#profile-picture")
        //             imagePreviewElement.src = URL.createObjectURL(file)
        //             Swal.clickConfirm()
        //         }
        //     })
        // })
        const registerButtonElement = this.editProfileElement.querySelector("#register-button")
            registerButtonElement.addEventListener("click", async () => {
                const fullname = this.editProfileElement.querySelector("#fullname").value
                const gender = this.editProfileElement.querySelector("input[name = 'gender']").value
                const countryId = this.editProfileElement.querySelector("#country_id").value;
                const provinceId = this.editProfileElement.querySelector("#province_id").value;
                const ageId = this.editProfileElement.querySelector("#age_id").value;
                const statusId = this.editProfileElement.querySelector("#status_id").value
                const businessId = this.editProfileElement.querySelector("#business_id").value;
                
                const jsonRequestBody = {
                    "fullname": fullname,
                    "gender": gender,
                    "country_id": countryId,
                    "province_id": provinceId,
                    "age_id": ageId,
                    "status_id": statusId,
                    "business_id": businessId
                }

                const validationResult = this.validateForm(jsonRequestBody)
                
                // console.log("Result:")
                // console.log(validationResult)

                if (validationResult.isTrue === false){
                    HTMLHelpers.makeInvalidStatusField(this.editProfileElement, validationResult)
                    this.editProfileElement.querySelector(validationResult.element).focus()
                }

                const userCheckResult = await MyFetch.userCheck(jsonRequestBody["username"], jsonRequestBody["email"])
                
                if (userCheckResult.status === 409){
                    Swal.fire({
                        title: "Oops!",
                        showCancelButton: false,
                        showConfirmButton: false,
                        showDenyButton: false,
                        html: `
                            <p>${userCheckResult.json.message}</p>
                            <button type = "button" class = "action-button" id = "swal-close-button" style = "width: 100%">OK</button>
                        `
                    })
                    SwalCustomFunctions.initializeCloseButton()
                    return
                }
                
                await this.performRequest(jsonRequestBody)
            })
    }
    async fetchUserData(){
        const responseJSONData = await UserGlobal.getUserFullData()
        this.editProfileElement.querySelector("#fullname").value = responseJSONData["fullname"];
        this.editProfileElement.querySelector("input[name = 'gender']").value = responseJSONData["gender"];
        this.editProfileElement.querySelector("#country_id").value = responseJSONData["country_id"];
        this.editProfileElement.querySelector("#province_id").value = responseJSONData["province_id"];
        this.editProfileElement.querySelector("#age_id").value = responseJSONData["age_id"];
        this.editProfileElement.querySelector("#status_id").value = responseJSONData["status_id"];
        this.editProfileElement.querySelector("#business_id").value = responseJSONData["business_id"];
    }
    appendChildren(){
        this.appendChild(this.editProfileElement)
    }
    async fetchData(){
        this.addProvincesOptionElement();
        this.addCountriesOptionElement();
        this.addAgesOptionElement();
        this.addStatusesOptionElement();
        await this.addBusinessesOptionElement();
        this.fetchUserData()
    }
    async connectedCallback(){
        this.render();
        Localization.initTranslate();
        this.fetchData();
        this.setListeners();
        this.appendChildren();
    }
}

customElements.define("edit_profile-page", EditProfilePage);
export default EditProfilePage;