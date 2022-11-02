import MyFetch from "../../../globals/my-fetch";
import Localization from "../../../utils/localization";
import GaugeElement from "../../templates/gauge";
import WindowController from "../../../utils/window-manager";

class ResultPage extends HTMLElement{
    constructor(){
        super();
        this.resultElement = document.createElement("div");
        this.submission = null
        this.userScore = null
    }
    async render(){
        this.resultElement.innerHTML = `
            <div class = "h1-header">
                <h1 data-i18n-key = "result">Result</h1>
            </div>
            <div class = "container">
                <div class = "result-section">
                </div>
            </div>
        `;
    }
    async renderResultElement(){
        const resultSectionElement = this.resultElement.querySelector(".result-section");
        const gaugeElement = new GaugeElement();

        const score = this.userScore.score;
        const scoreTitle = this.userScore.title;
        const scoreDescriptionEn = this.userScore.description_en;
        const scoreDescriptionId = this.userScore.description_in;
        const lastUpdatedScore = this.submission.created_at;

        gaugeElement.intiializeValues(score, 7);
        gaugeElement.renderAll();

        resultSectionElement.innerHTML += ` 
            <div id = "score-div">
                <p id = "last-updated-score" data-i18n-key = "last_updated_score"></p>
                <p id = "last">
                    ${lastUpdatedScore}
                </p>
            </div>
            
        `
        resultSectionElement.appendChild(gaugeElement);
        resultSectionElement.innerHTML += `
            <p id = "mindfullness-status">${scoreTitle}</p>
            <div id = "mindfulness-description">
                <p id = "mindfulness-description-id">${scoreDescriptionEn}</p>
                <p id = "mindfulness-description-en">${scoreDescriptionId}</p>
            </div>
            <p id = "your-entreprenurial-score" data-i18n-key = "your_entreprenurial_score">Your Entreprenurial Score</p>
        `;
        
        // }
        // else if (scoreJSON.status === 404){
        //     resultSectionElement.innerHTML = `
        //         <p id = "mindfulness-description">
        //             <span class="material-icons material-symbols-outlined" id = "no-test-icon">
        //                 edit_document
        //             </span>
        //             <p id = "no-test" data-i18n-key = "not_performed_test"></p>
        //         </p>
        //     `
        // }
        
        Localization.initTranslate();
    }
    async fetchCurrentAnswerByID(){
        const id = WindowController.getURLKeyPairHashParams().id;
        const submission = await MyFetch.getAnswer(id);
        this.submission = submission.json
    }
    async fetchScores(){
        let scores = await MyFetch.getScore();
        scores = scores.json;
        const userEMScore = this.submission.em_score;
        this.userScore = scores[userEMScore - 1]
        console.log(this.userScore);

    }
    async init(){
        this.render();
        await this.fetchCurrentAnswerByID();
        await this.fetchScores();
        await this.renderResultElement();
        this.appendChildren();
    }
    appendChildren(){
        this.appendChild(this.resultElement);
    }
}

customElements.define("result-page", ResultPage);
export default ResultPage;