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
        this.userAnswer = {
            'ACT': 4,
            'INS': 4,
            'UBE': 4,
            'HSI': 4,
            'HCA': 4,
            'DST': 4,
            'DEV': 4,
            'DCS': 4,
            'COG': 4,
            'AFK': 4,
        }
        this.refreshQuestionFunction = () => {
            this.renderQuestionElement()
            this.updateAnswerCaptionValue();
        }
    }
    renderLoadingElement(){
        this.loadingElement.setMessage(Localization.getLocalizedText("fetching_question"))
        this.appendChild(this.loadingElement)
    }
    removeLoadingElement(){
        this.removeChild(this.loadingElement)
    }
    render(){
        this.testElement.innerHTML = `
            <div class = "h1-header">
                <h1>Test</h1>
            </div>
            <div class = "container">
                <h1 id = "test-title">Entrepreneurial Mindfulness Test</h1>
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
                    <p id = "question_en"></p>
                    <p id = "question_id"></p>
                    <p id = "user_response_feedback"></p>
                    <input list = "tickmarks" type = "range" min = 1 max = 7 id = "user_response" name = "user_response">
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
                                <button type = "button" id = "save-answer" data-i18n-key = "save_answer" class = "action-button primary-button">
                                    Save Answer
                                </button>
                                
                            </div>
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
        const questionEnglishElement = this.testElement.querySelector("#question_en")
        const questionIndonesianElement = this.testElement.querySelector("#question_id")
        const tickmarksElement = this.testElement.querySelector("input[type='range']");
        const questionNumberElement = this.testElement.querySelector("#question_number");
        // const userResponseFeedbackElement = this.testElement.querySelector("#user_response_feedback")
        const currentQuestionNumber = parseInt(WindowController.getURLStripParts()[1]);
        // const userResponse = this.testElement.querySelector("#user_response").value

        dimensionElement.innerText = this.questions[currentQuestionNumber].dimension_name
        questionEnglishElement.innerText = this.questions[currentQuestionNumber].question_in
        questionIndonesianElement.innerHTML = this.questions[currentQuestionNumber].question_en
        questionNumberElement.innerText = `No. ${currentQuestionNumber}`
    
        // userResponseFeedbackElement.innerText = this.scores[tickmarksElement.value - 1].title
        // userResponseFeedbackElement.innerText = this.scores[userResponse - 1].title
        // console.log(`User Response Feedback Element: ${this.scores[userResponse - 1].title}`)
        const currentIndicator = this.questions[currentQuestionNumber].indicator_code.split('-')[1]
        tickmarksElement.value = `${this.userAnswer[currentIndicator]}`;
        
    }
    renderOptionsElement(){
        const tickmarksElement = this.testElement.querySelector("#tickmarks");
        this.scores.forEach(score => {
            const optionElement = document.createElement("option")
            optionElement.value = score.score
            optionElement.label = score.score
            tickmarksElement.appendChild(optionElement)
        });
    }
    updateCaptionAnswer(){
        const userResponseFeedbackElement = this.testElement.querySelector("#user_response_feedback")
        const userResponse = this.testElement.querySelector("#user_response").value
        userResponseFeedbackElement.innerText = this.scores[userResponse - 1].title
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
    initValueForResponseFeedback(){
        const userResponseFeedbackElement = this.testElement.querySelector("#user_response_feedback")
        const userResponse = this.testElement.querySelector("#user_response").value
        const currentQuestionNumber = parseInt(WindowController.getURLStripParts()[1]);
        const indicatorCode = this.questions[currentQuestionNumber].indicator_code
        const rightIndicatorCode = indicatorCode.split("-")[1]

        userResponseFeedbackElement.innerText = this.scores[userResponse - 1].title
        this.userAnswer[rightIndicatorCode] = parseInt(userResponse)
    }
    updateAnswerCaptionValue(){
        const userResponseFeedbackElement = this.testElement.querySelector("#user_response_feedback")
        const userResponse = this.testElement.querySelector("#user_response").value
        userResponseFeedbackElement.innerText = this.scores[userResponse - 1].title
    }
    setUserResponseListener(){
        const userResponseElement = this.testElement.querySelector("#user_response")
        userResponseElement.addEventListener("input", () => {
            this.initValueForResponseFeedback()
        })
    }
    setSaveAnswerListener(){
        const saveAnswerButton = this.testElement.querySelector("#save-answer")
        saveAnswerButton.addEventListener("click", async () => {
            saveAnswerButton.disabled = true
            saveAnswerButton.textContent = Localization.getLocalizedText("saving_answer")
            const responseJSON = await MyFetch.saveAnswer(this.userAnswer)
            if (responseJSON.status === 200){
                saveAnswerButton.disabled = false
                saveAnswerButton.textContent = Localization.getLocalizedText("save_answer")
            }
        })
    }
    setSubmitAnswerListener(){
        const submitAnswerButton = this.testElement.querySelector("#submit-answer")
        submitAnswerButton.addEventListener("click", async () => {
            Swal.fire({
                title: 'Processing your answers...',
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
            const responseJSON = await MyFetch.submitAnswer(this.userAnswer)
            console.log(responseJSON)
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
                SwalCustomFunctions.initializeCloseButton();
                WindowController.setWindowURLHash(`result`);
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
            }
        })
    }
    setQuestionListener(){
        window.addEventListener("hashchange", this.refreshQuestionFunction)
    }
    setListeners(){
        this.setNextButtonListener()
        this.setPreviousButtonListener()
        this.setHelpButtonListener()
        this.setUserResponseListener()
        this.setQuestionListener()
        this.setSaveAnswerListener()
        this.setSubmitAnswerListener()
    }
    async fetchQuestions(){
        const responseJSONData = await FetchHelpers.getJSONResult(
            ApiEndpoint.getQuestionLink(),
            FetchHelpers.getDefaultRequestBody()
        )
        if (responseJSONData.status === 200){
            this.questions = responseJSONData.json
        }
        console.log(responseJSONData)
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
    async fetchCurrentUserAnswer(){
        const responseJSONData = await MyFetch.getAnswer()
        this.userAnswer = responseJSONData.json
        console.log(`Response JSON Data: ${this.userAnswer.ACT}`)
    }
    async preRender(){
        this.renderLoadingElement();
        Localization.initTranslate();
        await this.fetchQuestions();
        await this.fetchScoresData();
        await this.fetchCurrentUserAnswer();
        this.removeLoadingElement();
    }
    async connectedCallback(){
        await this.preRender();
        this.render();
        this.setListeners();
        this.updateAnswerCaptionValue();
        Localization.initTranslate();
        this.appendChildren();
    }
    disconnectedCallback(){
        window.removeEventListener("hashchange", this.refreshQuestionFunction)
    }
    appendChildren(){
        this.appendChild(this.testElement);
    }
}

customElements.define("test-page", TestPage);
export default TestPage;