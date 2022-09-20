import MyFetch from "../../../globals/my-fetch";
import Localization from "../../../utils/localization";
import GaugeElement from "../../templates/gauge";

class ResultPage extends HTMLElement{
    constructor(){
        super();
        this.resultElement = document.createElement("div");
    }
    async render(){
        this.resultElement.innerHTML = `
            <div class = "h1-header">
                <h1>Result</h1>
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
        const scoreJSON = await MyFetch.getUserCurrentScore();
        if (scoreJSON.status === 200){
            console.log(scoreJSON.json)
            const score = scoreJSON.json.score;
            const scoreDescriptionEn = scoreJSON.json.score_desc_en;
            const scoreDescriptionId = scoreJSON.json.score_desc_id;
            const lastUpdatedScore = scoreJSON.json.last_updated;

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
                <p id = "mindfullness-status">Mindfullness Transformation</p>
                <div id = "mindfulness-description">
                    <p id = "mindfulness-description-id">${scoreDescriptionEn}</p>
                    <p id = "mindfulness-description-en">${scoreDescriptionId}</p>
                </div>
                <p id = "your-entreprenurial-score" data-i18n-key = "your_entreprenurial_score">Your Entreprenurial Score</p>
            `;
        
        }
        else if (scoreJSON.status === 404){
            resultSectionElement.innerHTML = `
                <p id = "mindfulness-description">
                    <span class="material-icons material-symbols-outlined" id = "no-test-icon">
                        edit_document
                    </span>
                    <p id = "no-test">You haven't performed entreprenurial mindfulness test yet! Please try taking the test first and submit it!</p>
                </p>
            `
        }
        
        Localization.initTranslate();
    }

    async connectedCallback(){
        this.render();
        this.renderResultElement();
        this.appendChildren();
    }
    appendChildren(){
        this.appendChild(this.resultElement);
    }
}

customElements.define("result-page", ResultPage);
export default ResultPage;