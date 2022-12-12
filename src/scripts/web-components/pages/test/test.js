import Swal from "sweetalert2";
import ApiEndpoint from "../../../globals/api-endpoint";
import MyFetch from "../../../globals/my-fetch";
import SwalCustomFunctions from "../../../globals/swal-custom-function";
import FetchHelpers from "../../../utils/fetch-helpers";
import Localization from "../../../utils/localization";
import WindowController from "../../../utils/window-manager";
import LoadingElement from "../../templates/loading";

class TestPage extends HTMLElement{
    constructor(){
        super();
        this.testElement = document.createElement("div");
        this.loadingElement = new LoadingElement();
        this.userAnswer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.refreshQuestionFunction = () => {
            try{
                this.renderQuestionElement();
                this.refreshCurrentAnswer();
            }
            catch{}
        }
    }
    async renderLoadingElement(){
        this.loadingElement.setMessage(Localization.getLocalizedText("fetching_question"))
        await this.loadingElement.init();
        this.appendChild(this.loadingElement);
        await Localization.initTranslate();
        this.loadingElement.style.visibility = "visible"
    }
    refreshCurrentAnswer(){
        const tickmarksElement = this.testElement.querySelector("#user_response");
        const currentQuestionNumber = parseInt(WindowController.getURLStripParts()[1]) - 1;
        tickmarksElement.value = this.userAnswer[currentQuestionNumber]
    }
    removeLoadingElement(){
        this.removeChild(this.loadingElement)
    }
    render(){
        this.testElement.innerHTML = `
            <div class = "h1-header">
                <h1 data-i18n-key = "entreprenurial_mindfulness_test"></h1>
            </div>
            <br>
            <div class = "container">
                <div class = "card">
                    <div class = "row">
                        <div class = "col-sm-8 col-md-8 col-lg-10">
                            <p>
                                <strong id = "dimension"></strong>
                            </p>
                        </div>
                        <div class = "col-sm-4 col-md-4 col-lg-2">
                            <button class = "icon-button-caption float-right" id = "help-button">
                                <span class = "material-icons">help</span>
                                <span class = "caption" data-i18n-key = "help">Help</span>
                            </button>
                        </div>
                    </div>
                    <p id = "question_number"></p>
                    <p data-i18n-key = "if_score_0"></p>
                    <p data-i18n-key = "if_score_1"></p>
                    <p id = "question_en_A"></p>
                    <p id = "question_id_A"></p>
                    <p data-i18n-key = "if_score_7"></p>
                    <p id = "question_en_B"></p>
                    <p id = "question_id_B"></p>
                    <p id = "user_response_feedback"></p>
                    <input list = "tickmarks" type = "range" min = 0 max = 7 id = "user_response" name = "user_response">
                    <datalist id = "tickmarks">

                    </datalist>
                    <div class = "row">
                        <div class = "col-sm-12 col-md-6 col-lg-6">
                            <button type = "button" id = "previous" data-i18n-key = "previous" class = "secondary-action-button">
                                Previous
                            </button>
                        </div>
                        <div class = "col-sm-12 col-md-6 col-lg-6">
                            <button type = "button" id = "next" data-i18n-key = "next" class = "secondary-action-button">
                                Next
                            </button>
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-12 col-md-12 col-lg-12" id = "light-dark-background">
                            <div class = "float-right">
                                <button type = "button" id = "submit-answer" data-i18n-key = "submit_answer" class = "action-button primary-button">
                                    Submit Answer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.renderQuestionElement()
        this.renderOptionsElement()
    }
    renderQuestionElement(){
        const dimensionElement = this.testElement.querySelector("#dimension")
        const questionEnglishAElement = this.testElement.querySelector("#question_en_A")
        const questionIndonesianAElement = this.testElement.querySelector("#question_id_A")
        const questionEnglishBElement = this.testElement.querySelector("#question_en_B")
        const questionIndonesianBElement = this.testElement.querySelector("#question_id_B")
        const tickmarksElement = this.testElement.querySelector("input[type='range']");
        const questionNumberElement = this.testElement.querySelector("#question_number");
        // const userResponseFeedbackElement = this.testElement.querySelector("#user_response_feedback")
        const currentQuestionNumber = parseInt(WindowController.getURLStripParts()[1]) - 1;
        // const userResponse = this.testElement.querySelector("#user_response").value

        dimensionElement.innerText = this.questions[currentQuestionNumber].dimension_name
        questionEnglishAElement.innerText = this.questions[currentQuestionNumber].questionA_en
        questionIndonesianAElement.innerHTML = this.questions[currentQuestionNumber].questionA_in
        questionEnglishBElement.innerText = this.questions[currentQuestionNumber].questionB_en
        questionIndonesianBElement.innerHTML = this.questions[currentQuestionNumber].questionB_in
        questionNumberElement.innerText = `No. ${currentQuestionNumber + 1}`
    
        const currentIndicator = this.questions[currentQuestionNumber].indicator_en.split('-')[1]
        tickmarksElement.value = `${this.userAnswer[currentIndicator]}`;
    }
    renderOptionsElement(){
        const tickmarksElement = this.testElement.querySelector("#tickmarks");

        const scoresInNumber = this.scores.length + 1
        for (var i = 0; i < scoresInNumber; i++){
            const optionElement = document.createElement("option")
            optionElement.value = i
            optionElement.label = i
            tickmarksElement.appendChild(optionElement)
        }
    }
    setPreviousButtonListener(){
        const previousNumberElement = this.testElement.querySelector("#previous");
        previousNumberElement.addEventListener("click", () => {
            const currentQuestionNumber = parseInt(WindowController.getURLStripParts()[1]) - 1;
            const questionNumberElement = this.testElement.querySelector("#question_number");
            if (currentQuestionNumber >= 1){
                WindowController.setWindowURLHash(`test/${currentQuestionNumber}`);
                questionNumberElement.innerText = `No. ${currentQuestionNumber}`;
            }
        });
    }
    setNextButtonListener(){
        const nextNumberElement = this.testElement.querySelector("#next");
        nextNumberElement.addEventListener("click", () => {
            const currentQuestionNumber = parseInt(WindowController.getURLStripParts()[1]) + 1;
            const questionNumberElement = this.testElement.querySelector("#question_number");
            if (currentQuestionNumber <= 10){
                WindowController.setWindowURLHash(`test/${currentQuestionNumber}`);
                questionNumberElement.innerText = `No. ${currentQuestionNumber}`;
            }
            else{
                nextNumberElement.disabled = false
            }
        });
    }
    setHelpButtonListener(){
        const btnHelp = this.testElement.querySelector("#help-button");
        btnHelp.addEventListener("click", () => {
            Swal.fire({
                title: Localization.getLocalizedText('test_tutorial_title'),
                icon: 'question',
                showConfirmButton: false,
                showCancelButton: false,
                showDenyButton: false,
                html: `
                    <p>${Localization.getLocalizedText('test_tutorial_explanation')}</p>
                    <button type = "button" id = "swal-close-button" class = "action-button" style = "width: 100%">OK</button>
                `,
            });
            SwalCustomFunctions.initializeCloseButton()
        });
    }
    initValueForResponseFeedback(scoreValue){
        const currentQuestionNumber = parseInt(WindowController.getURLStripParts()[1]) - 1;
        this.userAnswer[currentQuestionNumber] = parseInt(scoreValue)
    }
    updateAnswerCaptionValue(){
        const userResponseFeedbackElement = this.testElement.querySelector("#user_response_feedback")
        const userResponse = this.testElement.querySelector("#user_response").value
        userResponseFeedbackElement.innerText = this.scores[userResponse - 1].title
    }
    setUserResponseListener(){
        const userResponseElement = this.testElement.querySelector("#user_response")
        userResponseElement.addEventListener("input", () => {
            const scoreValue = userResponseElement.value;
            this.initValueForResponseFeedback(scoreValue)
            userResponseElement.value = scoreValue;
        })
    }

    checkIfAnsweredAll(){
        const unansweredQuestions = []
        this.userAnswer.forEach((value, index) => {
            if (value == 0){
                unansweredQuestions.push(index + 1)        
            }
        })
        
        if (unansweredQuestions.length != 0){
            Swal.fire({
                title: "Oops!",
                icon: "error",
                showConfirmButton: false,
                showCancelButton: false,
                showDenyButton: false,
                html: `
                    <p>${Localization.getLocalizedText('unanswered_questions_numbers')} ${unansweredQuestions}</p>
                    <p>${Localization.getLocalizedText('unanswered_questions_instruction')}</p>
                    <button type = "button" id = "swal-close-button" class = "action-button" style = "width: 100%">OK</button>
                `
            });
            SwalCustomFunctions.initializeCloseButton();
            return false; 
        }
        return true;
    }

    setSubmitAnswerListener(messageKey = "processing"){
        const submitAnswerButton = this.testElement.querySelector("#submit-answer")

        submitAnswerButton.addEventListener("click", async () => {
            Swal.fire({
                title: Localization.getLocalizedText(messageKey),
                icon: 'question',
                showConfirmButton: false,
                showCancelButton: false,
                showDenyButton: false,
                allowOutsideClick: false,
                showCloseButton: false,
                onBeforeOpen(){
                    Swal.showLoading()
                },
                onAfterClose(){
                    Swal.hideLoading()
                }
            });
            if (this.checkIfAnsweredAll() == false){
                return;
            }
            const responseJSON = await MyFetch.submitAnswer(
                this.userAnswer
            )
            if (responseJSON.status === 200){
                Swal.fire({
                    title: 'Hooray!',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    showDenyButton: false,
                    showCloseButton: false,
                    html: `
                        <p>${Localization.getLocalizedText('success_submit')}</p>
                        <button type = "button" id = "swal-close-button" class = "action-button" style = "width: 100%">OK</button>
                    `
                })
                const answerID = responseJSON.json.id
                SwalCustomFunctions.initializeCloseButton();
                WindowController.setWindowURLHash(`result?id=${answerID}`);
            }
            else{
                Swal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    showConfirmButton: false,
                    showCancelButton: false,
                    showDenyButton: false,
                    showCloseButton: false,
                    html: `
                        <p>${Localization.getLocalizedText('failed_submit')}</p>
                        <button type = "button" id = "swal-close-button" class = "action-button" style = "width: 100%">OK</button>
                    `
                })
                SwalCustomFunctions.initializeCloseButton();
            }
        })
    }
    setQuestionListener(){
        window.addEventListener("hashchange", this.refreshQuestionFunction, true)
    }
    setListeners(){
        this.setNextButtonListener()
        this.setPreviousButtonListener()
        this.setHelpButtonListener()
        this.setUserResponseListener()
        this.setQuestionListener()
        this.setSubmitAnswerListener()
    }
    async fetchQuestions(){
        const responseJSONData = await MyFetch.getQuestionData()
        if (responseJSONData.status === 200){
            this.questions = responseJSONData.json
        }
        return responseJSONData;
    }
    async fetchScoresData(){
        const responseJSONData = await FetchHelpers.getJSONResult(
            ApiEndpoint.getScoresLink(),
            FetchHelpers.getDefaultRequestBody()
        )
        if (responseJSONData.status === 200){
            this.scores = responseJSONData.json
        }
    }
    async preRender(){
        await this.renderLoadingElement();
        await this.fetchQuestions();
        await this.fetchScoresData();
        this.removeLoadingElement();
    }
    async init(){
        await this.preRender();
        this.render();
        this.setListeners();
        // this.updateAnswerCaptionValue();
        this.appendChildren();
    }
    disconnectCallback(){
        window.removeEventListener("hashchange", this.refreshQuestionFunction, true)
    }
    appendChildren(){
        this.appendChild(this.testElement);
    }
}

customElements.define("test-page", TestPage);
export default TestPage;