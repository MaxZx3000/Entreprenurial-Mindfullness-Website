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
        this.isProvinceAvailable = false;
        this.provinceJSON = {}
    }
    render(){
        this.editProfileElement.innerHTML = `
            <img id = "background-profile" src = "./images/forest.png" class = "background_image">
            <div class = "container">                
                <form>
                    <div class = "image-container">
                        <img id = 'profile-picture' src = "https://beeentmind-edutech.apps.binus.ac.id/api-em/images/profile_male.png" id = "profile-image">
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
                        <div class = "form-check-inline">
                            <input class="form-check-input" type="radio" id="Male" name="gender" value="Male">
                            <label class="form-check-label" for="Male" data-i18n-key = "male">Male</label>
                        </div>
                        <div class = "form-check-inline">
                            <input class="form-check-input" type="radio" id="Female" name="gender" value="Female">
                            <label class="form-check-label" for="Female" data-i18n-key = "female">Female</label>
                        </div>
                        <div class="invalid-feedback" id = 'gender-invalid-feedback'>
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
                        <button type = "button" id = "register-button" class = "action-button" data-i18n-key = "update_profile">Update Profile</button>
                    </div>
                </form>
            </div>
        `;
    }

    addProvincesOfflineOptionElement(){
        const selectProvincesElement = this.editProfileElement.querySelector("#province_id");
        const selectCountryElement = this.editProfileElement.querySelector("#country_id");

        const filteredProvinceJSON = this.provinceJSON.filter(province => province.country_id == selectCountryElement.value)
        selectProvincesElement.innerHTML = ""

        if (filteredProvinceJSON.length === 0){
            this.isProvinceAvailable = false;
        }
        else{
            this.isProvinceAvailable = true;
        }

        filteredProvinceJSON.forEach((province) => {
            const optionElement = document.createElement("option")
            optionElement.innerText = province.name
            optionElement.value = province.id
            selectProvincesElement.appendChild(optionElement)
        })
    }

    async addProvincesOptionElement(){
        const provinceJSON = await FetchHelpers.getJSONResult(
            ApiEndpoint.getProvinceAllLink(),
            FetchHelpers.getDefaultRequestBody(),
        )
        if (provinceJSON.status === 200){
            this.provinceJSON = provinceJSON.json;
            const selectProvincesElement = this.editProfileElement.querySelector("#province_id");
            const selectCountryElement = this.editProfileElement.querySelector("#country_id");

            this.provinceJSON.forEach((province) => {
                const optionElement = document.createElement("option")
                optionElement.innerText = province.name
                optionElement.value = province.id
                selectProvincesElement.appendChild(optionElement)
            });
            selectCountryElement.addEventListener("change", () => {
                this.addProvincesOfflineOptionElement();
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
        SwalCustomFunctions.initializeLoadingPopUp();
        const responseJSONData = await MyFetch.editProfile(jsonRequestData)
        if (responseJSONData.status === 200){
            UserGlobal.saveUserData(
                responseJSONData.json.data
            );
            Swal.fire({
                title: "Hooray!",
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                showDenyButton: false,
                html: `
                    <p>${Localization.getLocalizedText("success-edit-profile")}</p>
                    <button type = "button" id = "swal-close-button" class = "action-button" id = "forgot-password" style = "width: 100%">OK</button>
                `
            });
            SwalCustomFunctions.initializeCloseButton()
        }
        else if (responseJSONData.status === 401){
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
        else if (Validation.validateGender(json.gender).isTrue === false){
            const validation = Validation.validateFullname(json.gender)
            validation.element = "#gender-invalid-feedback"
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

        const registerButtonElement = this.editProfileElement.querySelector("#register-button")
            registerButtonElement.addEventListener("click", async () => {
                const fullname = this.editProfileElement.querySelector("#fullname").value
                const genderElement = this.editProfileElement.querySelector("input[name = 'gender']:checked")
                const gender = genderElement !== null ? genderElement.value : ""
                const countryId = this.editProfileElement.querySelector("#country_id").value;
                const provinceId = this.editProfileElement.querySelector("#province_id").value;
                const ageId = this.editProfileElement.querySelector("#age_id").value;
                const statusId = this.editProfileElement.querySelector("#status_id").value
                const businessId = this.editProfileElement.querySelector("#business_id").value;
                
                let jsonRequestBody = {};

                if (this.isProvinceAvailable){
                    jsonRequestBody = {
                        // "username": username,
                        "fullname": fullname,
                        "gender": gender,
                        "country_id": countryId,
                        "province_id": provinceId,
                        "age_id": ageId,
                        "status_id": statusId,
                        "business_id": businessId
                    }
                }
                else{
                    jsonRequestBody = {
                        // "username": username,
                        "fullname": fullname,
                        "gender": gender,
                        "country_id": countryId,
                        "age_id": ageId,
                        "status_id": statusId,
                        "business_id": businessId
                    }
                }
                
                const validationResult = this.validateForm(jsonRequestBody)

                if (validationResult.isTrue === false){
                    HTMLHelpers.makeInvalidStatusField(this.editProfileElement, validationResult)
                    this.editProfileElement.querySelector(validationResult.element).focus()
                    return
                }
                
                await this.performRequest(jsonRequestBody)
            })
    }
    async fetchUserData(){
        const responseJSONData = await UserGlobal.getUserData()
        this.editProfileElement.querySelector("#fullname").value = responseJSONData["fullname"];
        this.editProfileElement.querySelector(`input[name = 'gender'][id = '${responseJSONData["gender"]}'`).checked = true;
        this.editProfileElement.querySelector("#country_id").value = responseJSONData.country.id;
        this.editProfileElement.querySelector("#province_id").value = responseJSONData.province.id;
        this.editProfileElement.querySelector("#age_id").value = responseJSONData.age.id;
        this.editProfileElement.querySelector("#status_id").value = responseJSONData.status.id;
        this.editProfileElement.querySelector("#business_id").value = responseJSONData.business.id;
    }
    appendChildren(){
        this.appendChild(this.editProfileElement)
    }
    async fetchData(){
        await this.addProvincesOptionElement();
        await this.addCountriesOptionElement();
        await this.addAgesOptionElement();
        await this.addStatusesOptionElement();
        await this.addBusinessesOptionElement();
        await this.fetchUserData()
    }
    async init(){
        SwalCustomFunctions.initializeLoadingPopUp();
        this.render();
        await this.fetchData();
        this.setListeners();
        this.appendChildren();
        Swal.close();
    }
}

customElements.define("edit_profile-page", EditProfilePage);
export default EditProfilePage;