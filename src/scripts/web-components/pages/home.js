import University from "../../classes/university";
import Localization from "../../utils/localization";
import GridElement from "../templates/grid-element";

class HomePage extends HTMLElement{
    constructor(){
        super();
        this.homeElement = document.createElement('div');
    }

    connectedCallback(){
        this.render();
        Localization.initTranslate();
        this.appendChildren();
    }

    _getJumbotronElement(){
        return `
            <div class = "jumbotron">
                <div class = "container">
                    <h1 data-i18n-key = "entreprenurial_mindfullness_is">Entrepreneurial Mindfulness is…</h1>
                    <h2 data-i18n-key = "find_balance">finding balance in your entrepreneurial journey.</h2>
                    <button class = "action-button" data-i18n-key = "take_the_test">Take the test</button>
                </div>
            </div>
        `;
    }

    _getTentangKamiElement(){
        return `
            <h2 data-i18n-key = "about_us">About Us</h2>
            <p data-i18n-key = "about_us_content_1">Entrepreneurial Mindfulness merupakan sebuah website dengan instrumen yang mengukur kapabilitas seseorang untuk berfokus dan perhatian terhadap sesuatu yang menjadi rangkaian penting dalam proses menjadi sekaligus menjalankan praktik kewirausahaan.</p>
            <p data-i18n-key = "about_us_content_2">Instrumen Entrepreneurial Mindfulness dikembangkan oleh Research Interest Group (RIG) Edutech melalui Hibah Internasional BINUS University, berkolaborasi dengan berbagai institusi dari Indonesia dan Malaysia:</p>
        `;
    }

    _getConclusionElement(){
        return `
            <p data-i18n-key = "about_us_content_3">Kami berharap instrumen ini dapat membantu Anda menemukan keseimbangan dalam perjalanan kewirausahaan Anda.</p>
        `;
    }

    _getUniversitiesElement(){
        const universities = [
            new University("Pusat Penelitian Kebijakan Pendidikan Tinggi, Balitbangdikbud, Kemendikbud RI (PUSLITJAKDIKBUD)", "./images/tut-wuri-handayani.png"),
            new University("Universitas Agung Podomoro (UAP)", "./images/universitas-pomodoro.png"),
            new University("Universiti Teknologi Malaysia (UTM)", "./images/universitas-teknologi-malaysia.png")
        ]

        let universityElements = [];
        universities.forEach(element => {
            universityElements.push(`
                <div class = "card container">
                    <img class = "university-image" src = "${element.universityImageURL}" alt = "${element.universityName}">
                    <p>${element.universityName}</p>
                </div>
            `);
        });

        let gridElement = new GridElement();
        gridElement.setChildElements(universityElements);
        gridElement.setPerElementSize(6, 4, 4);
        gridElement.render();
        gridElement.appendChildren();
        return gridElement.innerHTML;
    }

    render(){
        this.homeElement.innerHTML = `
            ${this._getJumbotronElement()}
            <div class = "container">
                ${this._getTentangKamiElement()}
                ${this._getUniversitiesElement()}
                ${this._getConclusionElement()}
            </div>
        `;
    }

    appendChildren(){
        this.appendChild(this.homeElement);
    }
}

customElements.define("home-page", HomePage);
export default HomePage;