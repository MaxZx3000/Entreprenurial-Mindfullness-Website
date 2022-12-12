import Localization from "../../../utils/localization";
import WindowController from "../../../utils/window-manager";
import AboutEntrepreneurialMindfulnessPage from "./about_entrepreneurial_mindfulness";
import VideoIntervensiPage from "./video_intervensi";

class HomePage extends HTMLElement{
    constructor(){
        super();
        this.homeElement = document.createElement('div');
    }

    async init(){
        this.render();
        await this.initializeChangePage();
        this.addListeners();
        this.appendChildren();
    }

    _getJumbotronElement(){
        return `
            <div class = "jumbotron">
                <div class = "row" id = "row-1">
                    <img src = "./images/work-contribution.png" id = "work-contribution-image">
                </div>
                <div class = "row" id = "row-2">
                    <h1 data-i18n-key = "entreprenurial_mindfullness_is">Entrepreneurial Mindfulness is…</h1>
                    <h2 data-i18n-key = "find_balance">finding balance in your entrepreneurial journey.</h2>
                </div>
            </div>
        `;
    }

    render(){
        this.homeElement.innerHTML = `
            ${this._getJumbotronElement()}
            <div class = "container">
                <div class = "nav nav-tabs">
                    <li class = "nav-item">
                        <a class = "nav-link active" href = "#home/about" id = "about-entrepreneurial-mindfulness-link">
                            <span class="material-icons material-symbols-outlined">
                                help
                            </span>    
                            <span class = "nav-title" data-i18n-key = "about_entrepreneurial_mindfulness"></span>
                        </a>
                    </li>
                    <li class = "nav-item">
                        <a class = "nav-link" href = "#home/video" id = "video-intervensi-link">
                            <span class="material-icons material-symbols-outlined">
                                play_circle
                            </span>      
                            <span class = "nav-title" data-i18n-key = "video_intervensi"></span>
                        </a>
                    </li>
                </div>
            </div>
            <div id = "subpage">

            </div>
        `;
    }

    addListeners(){
        window.addEventListener("hashchange", (event) => {
            this.initializeChangePage();
        });
    }

    async initializeChangePage(){
        const currentURL = WindowController.getURLStripParts()[1];

        const subpageElement = this.homeElement.querySelector("#subpage");
        subpageElement.innerHTML = "";
        
        const aboutEntrepreneurialMindfulnessLink = this.homeElement.querySelector("#about-entrepreneurial-mindfulness-link");
        const videoIntervensiLink = this.homeElement.querySelector("#video-intervensi-link");
        
        if (currentURL === "about"){
            aboutEntrepreneurialMindfulnessLink.className = "nav-link active"
            videoIntervensiLink.className = "nav-link"
            const aboutEntrepreneurialMindfulnessElement = new AboutEntrepreneurialMindfulnessPage();
            aboutEntrepreneurialMindfulnessElement.init()
            subpageElement.appendChild(aboutEntrepreneurialMindfulnessElement)
            await Localization.initTranslate();
        } 
        else  if (currentURL === "video"){
            aboutEntrepreneurialMindfulnessLink.className = "nav-link"
            videoIntervensiLink.className = "nav-link active"
            const videoIntervensiElement = new VideoIntervensiPage();
            videoIntervensiElement.init()
            subpageElement.appendChild(videoIntervensiElement)
            await Localization.initTranslate();
        } 
    }

    appendChildren(){
        this.appendChild(this.homeElement);
    }
}

customElements.define("home-page", HomePage)
export default HomePage